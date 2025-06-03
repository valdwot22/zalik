import React, { useState } from 'react';
import './App.css';

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1');
      const data = await res.json();
      setWeather(data);
      console.log('Weather JSON:', data);
    } catch (e) {
      setError('Помилка завантаження погоди');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-widget">
      <button onClick={fetchWeather} disabled={loading} style={{marginBottom: 10}}>
        {loading ? 'Завантаження...' : 'Показати погоду (London)'}
      </button>
      {error && <div className="error-box">{error}</div>}
      {weather && weather.weather && weather.weather[0] && (
        <div className="weather-info">
          <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="icon" />
          <div>{weather.weather[0].main}</div>
          <div>Температура: {weather.main.temp} K</div>
        </div>
      )}
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors = [];
    if (!email) errors.push('Email не може бути порожнім.');
    if (password.length < 8) errors.push('Пароль має містити щонайменше 8 символів.');
    if (!/[A-Z]/.test(password)) errors.push('Пароль має містити хоча б одну велику літеру.');
    if (!/[^A-Za-z0-9]/.test(password)) errors.push('Пароль має містити хоча б один спеціальний символ.');
    if (/[\u0400-\u04FF]/.test(password)) errors.push('Пароль не повинен містити кириличних символів.');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errors = validate();
    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/form-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      console.log('Form API response:', data);
      if (data.status === 'OK') {
        setError('');
        alert('Успішно відправлено!');
      } else {
        setError('Сервер відхилив дані.');
      }
    } catch (err) {
      setError('Помилка мережі або сервера.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} style={{position:'relative', width:340, margin:'0 auto'}}>
      <img src="https://via.placeholder.com/300x120" alt="placeholder" />
      {error && <div className="error-box">{error}</div>}
      <div className="form-row">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} required disabled={loading} />
      </div>
      <div className="form-row">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} required disabled={loading} />
      </div>
      <div className="form-row">
        <a href="#" className="forgot-link">Forgot your password?</a>
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Submit'}
      </button>
      {loading && <div className="form-overlay"><i className="fas fa-spinner fa-spin fa-2x"></i></div>}
    </form>
  );
}

function App() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:40}}>
      <LoginForm />
      <WeatherWidget />
    </div>
  );
}

export default App;
