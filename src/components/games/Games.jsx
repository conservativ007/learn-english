import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/games/games.css";

const Games = ({ setName }) => {

  return (
    <div className="games">
      <div className="train">тренировка</div>
      <Link to={`/spelling/${setName}`}>письмо</Link>
    </div>
  );
}

export default Games;
