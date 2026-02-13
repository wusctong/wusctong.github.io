const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
});

// ✅ Event delegation — works for static AND dynamically injected elements
document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, input, label, select, textarea, .blog-item, [role="button"]')) {
        cursor.classList.add('hovering');
    }
});

document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, input, label, select, textarea, .blog-item, [role="button"]')) {
        cursor.classList.remove('hovering');
    }
});

document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));

document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');