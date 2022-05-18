import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/games.css";

const Games = ({ setName }) => {

  return (
    <div className="games">
      <Link to={`/spelling/${setName}`}>письмо</Link>
    </div>
  );
}

export default Games;
