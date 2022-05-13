import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/header.css";

const Header = () => {
  return (
    <header>
      <Link to="/">header</Link>
      <Link to="create-set">create set</Link>
    </header>
  );
}

export default Header;
