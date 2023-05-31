import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Login = () => {
  return (
    <>
      <Header>
        <Link to={'/sign-up'} className="header__link">
          Регистрация
        </Link>
      </Header>
      <div className="login">
        <form className="login__form">
          <h1 className="login__header">Вход</h1>
          <input
            className="login__field"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            className="login__field"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
          <div className="login__button-container">
            <button type="submit" className="login__button">
              Войти
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
