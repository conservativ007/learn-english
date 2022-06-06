import React, { useState, useRef }from 'react';
import { useParams } from 'react-router';
import { AiFillSound } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import "swiper/css/bundle";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';

import { speech } from '../hooks/speech';

const MySlider = () => {

  const swiperRef = useRef();
  
  const params = useParams();
  const name = params.card_name;
  const [cards] = useState(JSON.parse(localStorage.getItem(name)));
  const [indexSlide, setIndexSlide] = useState(0);

  function isFlippedCardToggle(e) {
    if(e.target.className === "flip-card-front" || e.target.className === "flip-card-back")
    e.currentTarget.classList.toggle("is-flipped");
  }

  if(cards) {
    return (
      <>
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        onSwiper={swiper => swiperRef.current = swiper}
        onSnapIndexChange={(index) => setIndexSlide(index.activeIndex)}
        >
          {
            cards.map((item, index) => 
              <SwiperSlide key={index}>
                <div className="flip-card">
                  <div onClick={isFlippedCardToggle} className="flip-card-inner">
                    <div className="flip-card-front">
                      <div className="card-word">{item.word}</div>
                      <AiFillSound onClick={() => speech(cards[indexSlide].word)} className="sound" />
                    </div>
                  <div className="flip-card-back">
                    <div className="card-word_translate">{item.wordTranslate}</div>
                    <div className="card-word_phrase">{item.phrase}</div>
                    <AiFillSound onClick={() => speech(cards[indexSlide].phrase)} className="sound" />
                  </div>
                </div>
              </div>
              </SwiperSlide>
            )
          }
        </Swiper>
        <div className="slider-arrows">
          <HiArrowNarrowLeft className="arrow" onClick={() => swiperRef.current.slidePrev()} />
          <div>{indexSlide + 1} / {cards.length}</div>
          <HiArrowNarrowRight className="arrow" onClick={() => swiperRef.current.slideNext()} />
        </div>
        </>
    );
  }
}

export default MySlider;
