import React, { useState } from 'react'; // Импорт React и функции useState из пакета 'react'
import { useLocation, useNavigate } from 'react-router-dom'; // Импорт функции useNavigate из пакета 'react-router-dom'
import axios from 'axios'; // Импорт axios для выполнения HTTP-запросов
import styles from './LoginForm.module.scss';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState(''); // Создание состояния для хранения значения username
  const [password, setPassword] = useState(''); // Создание состояния для хранения значения password
  const [error, setError] = useState(''); // Создание состояния для хранения значения error

  const navigate = useNavigate(); // Получение функции для навигации между страницами

  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value); // Обновление значения username при изменении поля ввода
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // Обновление значения password при изменении поля ввода
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращение перезагрузки страницы при отправке формы

    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password }); // Выполнение POST-запроса на сервер для авторизации
      const { token } = response.data; // Извлечение токена из ответа сервера

      // Сохранение токена в localStorage или в контексте состояния, если требуется
      localStorage.setItem('token', token);
      navigate('/'); // Переход на главную страницу после успешной авторизации
    } catch (error) {
      setError('Invalid username or password'); // Установка сообщения об ошибке при неверном имени пользователя или пароле
      console.error('Login error:', error); // Вывод ошибки в консоль
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};
