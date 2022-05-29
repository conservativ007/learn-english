import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/games/games.css";

const Games = ({ setName }) => {

  return (
    <div className="games">
      <div className="games-title">тренировка</div>
      <div className="games-train">
        <Link to={`/spelling/${setName}`}>письмо</Link>
        <Link to={`/listening/${setName}`}>аудирование</Link>
        <Link to={`/test/${setName}`}>тест</Link>
        <Link to={`/edit/${setName}`}>редактирование</Link>
      </div>
    </div>
  );
}

export default Games;
