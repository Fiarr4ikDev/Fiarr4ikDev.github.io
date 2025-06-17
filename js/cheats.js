const cheats = [
    {
        category: "SQL Заметки",
        items: [
            {
                title: "Создание резервной копии",
                code: "BACKUP DATABASE [YourDatabaseName]\nTO DISK = 'C:\\Backup\\YourDatabaseName.bak'\nGO"
            },
            {
                title: "Восстановление из копии",
                code: "RESTORE DATABASE [YourDatabaseName]\nFROM DISK = 'C:\\Backup\\YourDatabaseName.bak'\nGO"
            }
        ]
    },
    {
        category: "C# Заметки",
        items: [
            {
                title: "Подключение к базе данных",
                code: "string connectionString = @\"Server=ваш_сервер;Database=название_бд;User Id=sa;Password=пароль_при_создании_сервера;\";"
            },
            {
                title: "Выполнение SQL-запроса",
                code: "string query = @\"тут запрос\";\nSqlConnection connection = new SqlConnection(connectionString);  // connectionString - строка подключения к бд\nSqlDataAdapter adapter = new SqlDataAdapter(query, connection); // query - запрос\n\nDataTable table = new DataTable();\nadapter.Fill(table);\ndataGridViewData.DataSource = table; //dataGridViewData - имя DataGridView"
            }
        ]
    }
];

function renderCheats() {
    const list = document.querySelector('.modal-content #cheats-list');
    if (!list) return;
    list.innerHTML = '';

    cheats.forEach(categoryData => {
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = categoryData.category;
        list.appendChild(categoryTitle);

        categoryData.items.forEach(item => {
            const cheatItem = document.createElement('li');
            cheatItem.className = 'cheat-card'; // Добавил класс для стилей

            const itemTitle = document.createElement('h3');
            itemTitle.textContent = item.title;
            cheatItem.appendChild(itemTitle);

            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.textContent = item.code;
            pre.appendChild(code);
            cheatItem.appendChild(pre);

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = 'Копировать';
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(item.code).then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Скопировано!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 1500);
                }).catch(err => {
                    console.error('Ошибка копирования:', err);
                });
            };
            cheatItem.appendChild(copyBtn);

            list.appendChild(cheatItem);
        });
    });
} 