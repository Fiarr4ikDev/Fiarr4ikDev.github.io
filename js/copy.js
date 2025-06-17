document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const codeBlock = button.previousElementSibling.querySelector('code');
            const code = codeBlock.textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                
                // Визуальная обратная связь
                const originalText = button.textContent;
                button.textContent = 'Скопировано!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Ошибка при копировании:', err);
                button.textContent = 'Ошибка!';
                setTimeout(() => {
                    button.textContent = 'Копировать';
                }, 2000);
            }
        });
    });
}); 