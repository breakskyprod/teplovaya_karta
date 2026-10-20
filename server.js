const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Настройки для Basic Auth
// Логин и пароль берутся из переменных окружения на Render
const users = {};
users[process.env.AUTH_USER || 'admin'] = process.env.AUTH_PASS || 'password';

app.use(basicAuth({
    users,
    challenge: true,      // Показывать окно входа в браузере
    realm: 'Protected Area'
}));

// Раздаем статические файлы из текущей директории
app.use(express.static(__dirname));

// Отдаем главную страницу
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
