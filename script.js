// Blog posts configuration
const BLOGS_FOLDER = 'blogs';

// Function to fetch all markdown files from the blogs folder
async function fetchBlogList() {
    try {
        // Fetch the blog index file
        const response = await fetch(`${BLOGS_FOLDER}/index.json`);
        if (!response.ok) {
            throw new Error('Blog index not found');
        }
        
        const blogs = await response.json();
        return blogs;
    } catch (error) {
        console.error('Error fetching blog list:', error);
        return [];
    }
}

// Function to extract date from filename (format: YYYY-MM-DD-title.md)
function extractDateFromFilename(filename) {
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) {
        return match[1];
    }
    return 'NO DATE';
}

// Function to extract title from filename
function extractTitleFromFilename(filename) {
    // Remove .md extension
    let title = filename.replace('.md', '');
    
    // Remove date prefix if present
    title = title.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    
    // Replace hyphens and underscores with spaces
    title = title.replace(/[-_]/g, ' ');
    
    // Capitalize words
    title = title.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    return title;
}

// Function to render blog list
function renderBlogList(blogs) {
    const blogListElement = document.getElementById('blogList');
    const postCountElement = document.getElementById('postCount');
    
    if (!blogs || blogs.length === 0) {
        blogListElement.innerHTML = `
            <div class="empty-state">
                <p>NO ENTRIES FOUND</p>
                <p style="margin-top: 10px; font-size: 12px;">Add .md files to the /blogs folder</p>
            </div>
        `;
        postCountElement.textContent = '0 ENTRIES';
        return;
    }
    
    // Sort blogs by date (newest first)
    blogs.sort((a, b) => {
        const dateA = extractDateFromFilename(a.filename);
        const dateB = extractDateFromFilename(b.filename);
        return dateB.localeCompare(dateA);
    });
    
    postCountElement.textContent = `${blogs.length} ${blogs.length === 1 ? 'ENTRY' : 'ENTRIES'}`;
    
    const blogItems = blogs.map(blog => {
        const title = blog.title || extractTitleFromFilename(blog.filename);
        const date = blog.date || extractDateFromFilename(blog.filename);
        
        return `
            <a href="post.html?file=${encodeURIComponent(blog.filename)}" class="blog-item">
                <span class="blog-name">${title}</span>
                <div class="blog-spacer"></div>
                <span class="blog-date">${date}</span>
            </a>
        `;
    }).join('');
    
    blogListElement.innerHTML = blogItems;
}

// Initialize the blog list
async function init() {
    const blogListElement = document.getElementById('blogList');
    blogListElement.innerHTML = '<div class="loading">LOADING ARCHIVE...</div>';
    
    const blogs = await fetchBlogList();
    renderBlogList(blogs);
}

// Run on page load
document.addEventListener('DOMContentLoaded', init);
