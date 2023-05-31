import React from 'react';
//import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
//import useForm from '../hooks/useForm';

const Register = () => {
  //const [formValue, handleChange] = useState({
  //  username: '',
  //  password: '',
  // });

  //const navigate = useNavigate();

  return (
    <>
      <Header>
        <Link to={'/sign-in'} className="header__link">
          Войти
        </Link>
      </Header>

      <div className="register">
        <form className="register__form">
          <h1 className="register__header">Регистрация</h1>
          <input
            className="register__field"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            className="register__field"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
          <div className="register__button-container">
            <button type="submit" className="register__button">
              Зарегистрироваться
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p className="register__signin-title">
            Уже зарегистрированы?
            <Link to="/sign-in" className="register__login-link">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
