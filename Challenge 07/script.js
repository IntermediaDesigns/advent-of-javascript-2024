function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
}

const titleInput = document.getElementById('title');
const slugPreview = document.getElementById('slugPreview');

titleInput.addEventListener('input', (e) => {
    const slugified = slugify(e.target.value);
    slugPreview.textContent = slugified || 'slug-preview';
});