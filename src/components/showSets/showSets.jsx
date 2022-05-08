import React from 'react';
import "./showSets.css";


const Showsets = () => {

  let backgrounds = ["#ff7675", "#fab1a0", "#55efc4", "#81ecec"];

  let sets = JSON.parse(localStorage.getItem("LEARN_ENGLISH"));
  if(sets.length > 0)

  return (
    <div className="set-container">
      {
        sets.map((item, index) => {
          return (
            <div key={index} style={{backgroundColor: backgrounds[index]}} className="set">
              {item}
            </div>
          )
        })
      }
    </div>
  );
}

export default Showsets;
