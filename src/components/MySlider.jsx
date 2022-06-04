import React, { useEffect, useState, useRef }from 'react';
import { useParams } from 'react-router';
import { AiFillSound } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import "swiper/css/bundle";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';

const MySlider = () => {

  const swiperRef = useRef();
  
  const params = useParams();
  const name = params.card_name;
  const [cards] = useState(JSON.parse(localStorage.getItem(name)));

  function isFlippedCardToggle(e) {
    if(e.target.className === "flip-card-front" || e.target.className === "flip-card-back")
    e.currentTarget.classList.toggle("is-flipped");
  }

  return (
    <>
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      pagination={{ clickable: true }}
      onSwiper={swiper => swiperRef.current = swiper}
      onSlideChange={() => console.log('slide change')}
      >
        {
          cards.map((item, index) => 
            <SwiperSlide key={index}>
              <div className="flip-card">
                <div onClick={isFlippedCardToggle} className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-word">{item.word}</div>
                    {/* <AiFillSound onClick={() => speech(cards.word)} className="sound" /> */}
                  </div>
                <div className="flip-card-back">
                  <div className="card-word_translate">{item.wordTranslate}</div>
                  <div className="card-word_phrase">{item.phrase}</div>
                  {/* <AiFillSound onClick={() => speech(cards[counter].phrase)} className="sound" /> */}
                </div>
              </div>
            </div>
            </SwiperSlide>
          )
        }
      </Swiper>
      <div className="slider-arrows">
        <HiArrowNarrowLeft className="arrow" onClick={() => swiperRef.current.slidePrev()} />
        <HiArrowNarrowRight className="arrow" onClick={() => swiperRef.current.slideNext()} />
      </div>
      </>
  );
}

export default MySlider;
