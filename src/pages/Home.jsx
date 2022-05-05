import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>
        Hello stranger let's started to learn English now :)
      </h1>
      <nav>
        <Link to="create-set">Create your first set of words</Link>
        <br />
        <Link to="about">About</Link>
      </nav>
    </div>
    
  );
}

export default Home;
