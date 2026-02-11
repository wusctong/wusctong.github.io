# Minimalist Blog

A cold, geometric static blog built for GitHub Pages.

## Features

- 🔲 Pure geometric design (rectangles & circles only)
- 🌑 Dark, cold color scheme
- 📝 Markdown blog posts
- ⚡ Lightning fast (no build process)
- 🚀 Deploy directly to GitHub Pages

## Quick Start

### Local Development

1. Clone this repository
2. Open `index.html` in your browser
3. Or use a simple HTTP server:
   ```bash
   python -m http.server 8000
   ```

### Adding Blog Posts

1. Create a new `.md` file in the `blogs/` folder
   - Use format: `YYYY-MM-DD-title.md`
   - Example: `2026-02-11-my-new-post.md`

2. Add frontmatter (optional):
   ```markdown
   ---
   title: My New Post
   date: 2026-02-11
   ---
   
   # Your content here
   ```

3. Update `blogs/index.json`:
   ```json
   {
     "filename": "2026-02-11-my-new-post.md",
     "title": "My New Post",
     "date": "2026-02-11"
   }
   ```

## Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save

4. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## File Structure

```
/
├── index.html          # Homepage with blog list
├── post.html           # Blog post viewer
├── style.css           # All styles
├── script.js           # Homepage logic
├── post.js             # Post viewer logic
└── blogs/
    ├── index.json      # Blog index
    └── *.md            # Blog posts
```

## Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
    --bg-primary: #0a0e14;
    --bg-secondary: #151a21;
    --text-primary: #e6e8eb;
    --text-secondary: #8a8f98;
    --accent: #4a9eff;
}
```

### Layout

- Modify `max-width` in `.container` for page width
- Adjust spacing in header/footer sections
- Change typography in body styles

## License

MIT - Do whatever you want with it.

---

**ARCHIVE / MINIMAL / FUNCTIONAL**
