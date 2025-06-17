document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const clearButton = document.getElementById('clear-search');
    const contentBlocks = document.querySelectorAll('.content-block');

    function updateClearButton() {
        if (searchInput.value.length > 0) {
            clearButton.classList.add('show');
        } else {
            clearButton.classList.remove('show');
        }
    }

    function clearSearch() {
        searchInput.value = '';
        clearButton.classList.remove('show');
        searchInput.focus();
        filterContent('');
    }

    function filterContent(searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        
        contentBlocks.forEach(block => {
            const text = block.textContent.toLowerCase();
            const isVisible = text.includes(searchLower);
            block.style.display = isVisible ? 'block' : 'none';
            
            if (isVisible) {
                block.style.animation = 'fadeIn 0.3s ease-out';
            }
        });
    }

    searchInput.addEventListener('input', (e) => {
        updateClearButton();
        filterContent(e.target.value);
    });

    clearButton.addEventListener('click', clearSearch);

    // Инициализация
    updateClearButton();
}); 