document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorBox = document.getElementById('errorBox');
    errorBox.style.display = 'none';
    errorBox.textContent = '';

    // Валідація
    const errors = [];
    // Email перевіряється HTML, але можна додати додаткову перевірку за потреби
    // Перевірка пароля
    if (password.length < 8) {
        errors.push('Пароль має містити щонайменше 8 символів.');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Пароль має містити хоча б одну велику літеру.');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        errors.push('Пароль має містити хоча б один спеціальний символ.');
    }
    if (/[\u0400-\u04FF]/.test(password)) {
        errors.push('Пароль не повинен містити кириличних символів.');
    }

    if (errors.length > 0) {
        errorBox.textContent = errors.join('\n');
        errorBox.style.display = 'block';
        return;
    }

    // Блокуємо форму та показуємо лоадер
    setFormDisabled(true);
    document.getElementById('formOverlay').style.display = 'flex';
    document.getElementById('btnText').style.display = 'none';

    // ВАЖЛИВО: абсолютний шлях до Flask-сервера
    fetch('http://localhost:5000/form-api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
    .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    })
    .then(data => {
        errorBox.style.display = 'none';
        errorBox.textContent = '';
        alert('Успішно відправлено!');
    })
    .catch(err => {
        errorBox.textContent = 'Помилка: ' + err;
        errorBox.style.display = 'block';
    })
    .finally(() => {
        setFormDisabled(false);
        document.getElementById('formOverlay').style.display = 'none';
        document.getElementById('btnText').style.display = 'inline';
    });
});

function setFormDisabled(disabled) {
    document.getElementById('email').disabled = disabled;
    document.getElementById('password').disabled = disabled;
    document.querySelector('.submit-btn').disabled = disabled;
} 