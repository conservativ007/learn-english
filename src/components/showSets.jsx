import React from 'react';
import { Link } from 'react-router-dom';
import "./showSets.css";


const Showsets = () => {

  let backgrounds = ["#ff7675", "#fab1a0", "#55efc4", "#81ecec"];

  let sets = JSON.parse(localStorage.getItem("LEARN_ENGLISH"));
  if(sets && sets.length > 0)

  return (
    <div className="set-container">
      <h2>Your sets</h2>
      <div className="sets">
        {
          sets.map((item, index) => {
            return (
              <div 
                key={index} 
                style={{backgroundColor: backgrounds[index]}} 
                className="set"
              >
                <Link className="link" to={`/show-card/${item}`}>{item}</Link>
              </div>
            )
          })
        }
      </div>
      
    </div>
  );
}

export default Showsets;