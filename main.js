// common.js - Common functionality for PDF Tools website

document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer dynamically
    loadComponent('header', document.querySelector('#header-container'));
    loadComponent('footer', document.querySelector('#footer-container'));
    
    // Initialize search functionality if on index page
    if (document.querySelector('#search-input')) {
        initializeSearch();
    }
});

/**
 * Load a component (header/footer) into the specified container
 * @param {string} componentName - Name of the component (header/footer)
 * @param {HTMLElement} container - Container element to load the component into
 */
function loadComponent(componentName, container) {
    if (!container) return;
    
    fetch(`/${componentName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${componentName}`);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            
            // Initialize search if it's the header and contains search input
            if (componentName === 'header' && document.querySelector('#search-input')) {
                initializeSearch();
            }
        })
        .catch(error => {
            console.error(`Error loading ${componentName}:`, error);
            container.innerHTML = `<div class="alert alert-danger">Failed to load ${componentName}</div>`;
        });
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.querySelector('#search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().
