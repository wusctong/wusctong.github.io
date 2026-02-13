const BLOGS_FOLDER = 'blogs';

// Function to get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to extract date from filename
function extractDateFromFilename(filename) {
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) {
        return match[1];
    }
    return '';
}

// Function to extract title from filename
function extractTitleFromFilename(filename) {
    let title = filename.replace('.md', '');
    title = title.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    title = title.replace(/[-_]/g, ' ');
    title = title.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    return title;
}

// Function to load and render blog post
async function loadPost() {
    const blogIndex = getUrlParameter('post');

    if (!blogIndex) {
        document.getElementById('postTitle').textContent = 'ERROR';
        document.getElementById('postBody').innerHTML = '<p>No blog post specified.</p>';
        return;
    }
    
    try {
        const blogsResponse = await fetch(`${BLOGS_FOLDER}/index.json`);

        if (!blogsResponse.ok) {
            throw new Error('Post not found');
        }

        const blogs = await blogsResponse.json();
        blogs.sort((a, b) => {
            const dateA = extractDateFromFilename(a.filename);
            const dateB = extractDateFromFilename(b.filename);
            return dateA.localeCompare(dateB);
        });

        if (blogIndex >= blogs.length) {
            document.getElementById('postTitle').textContent = 'ERROR';
            document.getElementById('postBody').innerHTML = '<p>No blog post specified.</p>';
            return;
        }

        const currentBlog = blogs[blogIndex];
        const response = await fetch(`${BLOGS_FOLDER}/${currentBlog.filename}`);

        if(!response.ok) {
            throw new Error('Post not found');
        }

        const markdown = await response.text();

        // Extract metadata from Markdown if present
        let title = currentBlog.title || extractTitleFromFilename(currentBlog.filename);
        let date = currentBlog.date || extractDateFromFilename(currentBlog.filename);
        let content = markdown;

        // Check for YAML front matter
        const frontMatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (frontMatterMatch) {
            const frontMatter = frontMatterMatch[1];
            content = frontMatterMatch[2];

            // Parse front matter
            const titleMatch = frontMatter.match(/title:\s*(.+)/);
            const dateMatch = frontMatter.match(/date:\s*(.+)/);

            if (titleMatch) title = titleMatch[1].trim().replace(/^["']|["']$/g, '');
            if (dateMatch) date = dateMatch[1].trim();
        }

        // Update page title and metadata
        document.title = title;
        document.getElementById('postTitle').textContent = title;
        document.getElementById('postDate').textContent = date;

        // Render Markdown to HTML
        document.getElementById('postBody').innerHTML = marked.parse(content);

    } catch (error) {
        console.error('Error loading post:', error);
        document.getElementById('postTitle').textContent = 'POST NOT FOUND';
        document.getElementById('postDate').textContent = '';
        document.getElementById('postBody').innerHTML = `
            <p>Unable to load the requested blog post.</p>
            <p style="margin-top: 20px; color: var(--text-secondary);">Error: ${error.message}</p>
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadPost);
