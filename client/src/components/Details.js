import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getById } from "../actions";
import dt from "./Details.module.css";

export default function  Details(props) {
  console.log('pr', props)

  // let id = props.match.params.id;

  const dispatch = useDispatch();
  const details = useSelector(state => state.details);
  console.log('dt', details)

  useEffect(() => {
    dispatch(getById(props.match.params.id));
  },[dispatch, props.match.params.id]);

  return (
    <div className={dt.container}>
      <h1 >Videogame Details</h1>
      <Link to='/home'>
        <button className={dt.btnBack} type="button" >Back to Home</button>
      </Link>

      {
        Object.entries(details).length ?
        <div className={dt.containerCard} >
          <h1>{details.name}</h1>
          <img src={details.image} alt={details.name} height='400px'></img>
          <p>Description: {details.description}</p>
          <h2>Released at: {details.released}</h2>
          <h2>Rating: {details.rating}</h2>
          <h2>Platforms: { details.platforms.join(' - ')} </h2>
          <h2>Genres: { !isNaN(details.id) ? details.genres.join(' - ') : details.Genres.map(el => el.name).join(' - ') }</h2>
        </div> :
        <div className={dt.loading}>
          <div className={`${dt.loadingSkeleton} ${dt.titleSkeleton}`}></div>
          <div className={`${dt.loadingSkeleton} ${dt.descriptionSkeleton}`}></div>
        </div>
      }
    </div>
  )
}