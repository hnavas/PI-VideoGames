import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router-dom';
import Card from './Card'
import Paginate from './Paginate';
import s from './Home.module.css'


export default function Home() {

  const dispatch = useDispatch();
  const stateVideogames = useSelector(state => state.videogames);
  const stateGenres = useSelector(state => state.genres);

  const [order, setOrder] = useState(false);

  //PAGINADO//
  //1. Defino estados locales
  const [actualPage, setActualPage] = useState(1);
  const [gamesByPage, ] = useState(15);
  //2. Declaro los indices de los games que se mostraran por pagina
  const lastGame = actualPage * gamesByPage;
  const firstGame = lastGame - gamesByPage;
  const actualGames = stateVideogames.slice(firstGame, lastGame);
  //3. declaro mi constate de paginado
  const paginate = numPage => {
    setActualPage(numPage);
  }

  useEffect(() => {
    dispatch(actions.getVideogames());
    dispatch(actions.getGenres());
  },[dispatch]);

  let handleUpdate = (e) => { //Recargar Videojuegos
    e.preventDefault();
    dispatch(actions.getVideogames());
  }

  let handleFilterByStatus = (e) => {
    dispatch(actions.filterByStatus(e.target.value));
  }

  let handleFilterByGenres = (e) => {
    dispatch(actions.filterByGenres(e.target.value));
  }

  let handleOrderByAZ = (e) => {
    e.preventDefault();
    dispatch(actions.orderAlphabetically(e.target.value));
    setActualPage(1);
    setOrder(!order)
  }

  let handleOrderByRating = (e) => {
    dispatch(actions.orderByRating(e.target.value));
    setOrder(!order)
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
        <select onChange={(e) => handleOrderByAZ(e)}> 
          <option hidden >--Order by AZ--</option>
          <option value='az'>Sort A-Z</option>
          <option value='za'>Sort Z-A</option>
        </select>

        <select onChange={(e) => handleOrderByRating(e)}> 
          <option value='' hidden >--Order by Rating--</option>
          <option value='high'>High Rating</option>
          <option value='low'>Low Rating</option>
        </select>

        <select onChange={(e) => handleFilterByStatus(e)}>
          <option value='' hidden>--Filter by Status--</option>
          <option value='all'>All</option>
          <option value='created'>Created</option>
          <option value='existing'>Existing</option>
        </select>

        <select onChange={(e) => handleFilterByGenres(e)}>
          <option hidden >--Filter By Genre--</option>
          <option value='all'>All Genres</option>
          {
            stateGenres.map(g => (
              <option key={g.id} value={g.name}>{g.name}</option>
            ))
          }
        </select>
      </div>
      <Paginate
        gamesByPage={gamesByPage}
        stateVideogames = {stateVideogames.length}
        actualPage = {actualPage}
        paginate = {paginate}
      />

      <h1>Videogames</h1>

      <div className={s.containerCard}>
        {
          actualGames && actualGames.map(game => {
            return (
              <div className={s.cards} key={game.id}>
                <Link to={`home/${game.id}`} >
                  <Card
                    id={game.id}
                    key={game.id}
                    name={game.name}
                    image={game.image}
                    genres={game.genres.join(' - ')}
                  />
                </Link>
              </div>
            );
          })
        }
      </div>
      <Paginate
        gamesByPage={gamesByPage}
        stateVideogames = {stateVideogames.length}
        actualPage = {actualPage}
        paginate = {paginate}
      />
    </div>
  )
}