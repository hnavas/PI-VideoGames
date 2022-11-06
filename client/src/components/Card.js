import React from "react";
import s from './Card.module.css';

export default function Card({id, name, rating, genres, image}){
  return (
    <div className={s.cardVG}>
      <div className={s.cardName}>
        <h3>{name}</h3>
      </div>
      <div>
        <img src={image}  className={s.cardImage} alt={`Image of ${name}`}/>
      </div>
      <div className={s.cardGenres}>
        <h5>Genres: {genres}</h5>
      </div>
    </div>
  )
}