import React from 'react';
import logoPath from '../images/logo.svg';

function Header({ children }) {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип сайта" className="header__logo" />
      {children}
    </header>
  );
}
export default Header;
/*
          <Route path="/">
            <NavLink to="/sign-up" className="menu__link">
              Выйти
            </NavLink>
          </Route>
        </Routes>
      */
