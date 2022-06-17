import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setNameAction } from '../store/setNameReducer';

import "../styles/showSets.css";
import "../styles/video.css";
import video from "../assets/video2.mkv";

const Showsets = () => {
  
  // const dispatch = useDispatch();
  let backgrounds = ["#ff7675", "#fab1a0", "#55efc4", "#81ecec", "#ff9ff3", "#feca57", "#ff6b6b", "#1dd1a1"];
  let sets = JSON.parse(localStorage.getItem("LEARN_ENGLISH"));

  if(!sets) {
    return (
      <div className="main-container">
        <div className="set-container">
          <h2>У вас ещё нету подборки создайте первую :)</h2>
          <Link className="set-link" to={`/create-set/${"default"}`}>создать первую подборку</Link>
        </div>
        <div className="video-container">
          <video className="video" controls src={video}></video>
        </div>
      </div>
    )
  }
  
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
                style={{backgroundColor: backgrounds[index % backgrounds.length]}} 
                className="set"
              >
                <Link 
                // onClick={() => dispatch(setNameAction(item))} 
                className="link" 
                to={`/show-card/${item}`}>{item}</Link>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Showsets;
