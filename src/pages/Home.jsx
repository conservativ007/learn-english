import React from 'react';
import { Link } from 'react-router-dom';
import Showsets from '../components/showSets/showSets';

const Home = () => {
  return (
    <div style={{marginLeft: "10px"}}>
      <h1>
        Hello stranger let's started to learn English now :)
      </h1>
      <nav>
        <Link to="create-set">Create your first set of words</Link>
      </nav>
      <Showsets />
    </div>
    
  );
}

export default Home;
