import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router-dom';
import Card from './Card'
import s from './Home.module.css'

export default function Home() {
  const dispatch = useDispatch();
  const stateVideogames = useSelector(state => state.videogames);
  const stateGenres = useSelector(state => state.genres);

  useEffect(() => {
    dispatch(actions.getVideogames());
    dispatch(actions.getGenres());
  },[dispatch]);

  let handleUpdate = (e) => { //Recargar Videojuegos
    e.preventDefault();
    dispatch(actions.getVideogames());
  }

  let handleFilterByGenres = (e) => { //Filtrar por generos

  }

  let handleFilterByCreated = (e) => { //Filtrar por API o BD

  }

  let handleOrderByAZ = (e) => { //Ordenar Alfabeticamente

  }

  let handleOrderByRating = (e) => { //Ordenar por valor del Rating

  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Welcome to Home</h1>
      <div className={s.linkCreate}>
        <Link to='/videogame'>
          <button>Create Videogame</button>
        </Link>
        <button onClick={(e) => handleUpdate(e)}>Reload Videogames</button>
      </div>
      <div className={s.filterBar}>
        <select> // Ordenar Alfabeticamente
          <option value='default' hidden selected>--Order by AZ--</option>
          <option value='asc'>Sort A-Z</option>
          <option value='desc'>Sort Z-A</option>
        </select>
        <select> // Ordenar por Rating
          <option value='default' hidden selected>--Order by Rating--</option>
          <option value='low'>Low Rating</option>
          <option value='high'>High Rating</option>
        </select>
        <select> //Filtrar por existentes o creados
          <option value='default' hidden selected>--Filter by Status--</option>
          <option value='all'>All</option>
          <option value='created'>Created</option>
          <option value='api'>Existing</option>
        </select>
        <select>
          <option value='default' hidden selected>--Filter By Genre--</option>
        </select>
      </div>
      <h1>Videogames</h1> 
      <div className={s.containerCard}>
        {
          stateVideogames && stateVideogames.map(vg => {
            return (
              <div className={s.cards}>
                <Link to={`home/${vg.id}`}>
                  <Card
                    id={vg.id}
                    key={vg.id}
                    name={vg.name}
                    image={vg.image}
                    genres={vg.genres}
                  />
                </Link>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}
