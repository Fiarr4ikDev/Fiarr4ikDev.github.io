document.addEventListener('DOMContentLoaded', () => {
    const secretBtn = document.getElementById('secret-btn');
    const modal = document.getElementById('cheats-modal');
    const backdrop = document.querySelector('.modal-backdrop');
    if (!secretBtn || !modal || !backdrop) return;

    secretBtn.addEventListener('click', (e) => {
        modal.classList.remove('hidden');
        renderCheats();
    });

    function closeModal() {
        modal.classList.add('hidden');
    }

    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('hidden') && e.key === 'Escape') closeModal();
    });
}); 