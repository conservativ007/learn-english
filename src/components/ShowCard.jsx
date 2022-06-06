import React from 'react';
import { useParams } from 'react-router';
import "../styles/show-card.css";
import Header from './Header';
import Games from './games/Games';

import "swiper/css";
import "swiper/css/pagination";

import MySlider from './MySlider';

const ShowCard = () => {
  const params = useParams();
  const name = params.card_name;

  return (
    <>
      <Header />
      <MySlider />
      <Games setName={name} />
    </>
  );
}

export default ShowCard;
