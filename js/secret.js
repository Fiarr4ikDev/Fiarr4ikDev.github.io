document.addEventListener('DOMContentLoaded', () => {
    const secretToggle = document.getElementById('secret-toggle');
    const mainContent = document.getElementById('main-content');
    const placeholderContent = document.getElementById('placeholder-content');
    let isSecretMode = true;

    // Добавляем обработчик нажатия клавиш
    document.addEventListener('keydown', (e) => {
        // Проверяем комбинацию Ctrl + Shift + S
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
            toggleContent();
        }
    });

    // Добавляем обработчик клика по кнопке
    secretToggle.addEventListener('click', () => {
        toggleContent();
    });

    function toggleContent() {
        isSecretMode = !isSecretMode;
        
        if (isSecretMode) {
            mainContent.classList.add('hidden');
            placeholderContent.classList.remove('hidden');
            secretToggle.classList.add('active');
        } else {
            mainContent.classList.remove('hidden');
            placeholderContent.classList.add('hidden');
            secretToggle.classList.remove('active');
        }
    }

    // Устанавливаем начальное состояние блоков и кнопки
    mainContent.classList.add('hidden');
    placeholderContent.classList.remove('hidden');
    secretToggle.classList.add('active');
}); 