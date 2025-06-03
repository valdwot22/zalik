document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
        alert('Помилки валідації:\n' + errors.join('\n'));
        return;
    }

    fetch('/form-api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
    .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    })
    .then(data => alert('Успішно відправлено!'))
    .catch(err => alert('Помилка: ' + err));
}); 