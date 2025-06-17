const scrollToTopButton = document.getElementById('scroll-to-top');

// Показываем/скрываем кнопку при прокрутке
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

// Плавная прокрутка вверх при клике
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 