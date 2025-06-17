const cheats = [
    'console.log(…) — вывод в консоль',
    'let/const/var — объявление переменных',
    'document.querySelector — выбор элемента',
    'for (let i = 0; i < n; i++) { … } — цикл',
    'if (условие) { … } else { … } — условие',
    '// … — комментарий',
    'function имя(…) { … } — функция',
    '=> — стрелочная функция',
    'JSON.parse/JSON.stringify — работа с JSON',
    'localStorage.setItem/getItem — хранение данных',
];

function renderCheats() {
    const list = document.querySelector('.modal-content #cheats-list');
    if (!list) return;
    list.innerHTML = '';
    cheats.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
} 