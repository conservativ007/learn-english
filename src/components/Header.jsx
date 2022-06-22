import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/header.css";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="links">
          <Link to="/">главная</Link>
          <Link to={`/create-set/${"default"}`}>создать подборку</Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
