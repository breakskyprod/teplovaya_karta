const express = require('express');
const path = require('path');
const auth = require('http-auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Настройки для Basic Auth. 
// В Render мы зададим эти переменные окружения для безопасности.
const basic = auth.basic({
    realm: 'Protected Area'
}, (username, password, callback) => {
    // Проверяем логин и пароль из переменных окружения
    const validUser = process.env.AUTH_USER || 'udm';
    const validPass = process.env.AUTH_PASS || 'udm2026';
    callback(username === validUser && password === validPass);
});

// ВАЖНО: Middleware аутентификации должен идти ПЕРЕД express.static,
// чтобы защитить все статические файлы (HTML, JS, CSS).
app.use(auth.connect(basic));

// Раздаем статические файлы из текущей директории
app.use(express.static(__dirname));

// Если пользователь зашел на главную, отдаем index.html (или ваш файл)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
