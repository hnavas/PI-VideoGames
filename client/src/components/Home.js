import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/index';
import Card from './Card'
import Paginate from './Paginate';
import SearchBar from './SearchBar';
import s from './Home.module.css'


export default function Home() {

  const dispatch = useDispatch();
  const stateVideogames = useSelector(state => state.videogames);
  const stateGenres = useSelector(state => state.genres);

  const [ order, setOrder ] = useState(false);

  //PAGINADO//
  //1. Defino estados locales
  const [ actualPage, setActualPage ] = useState(1);
  const [ gamesByPage, ] = useState(15);
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
    setActualPage(1);
  }

  let handleFilterByGenres = (e) => {
    dispatch(actions.filterByGenres(e.target.value));
    setActualPage(1);
  }

  let handleOrderByAZ = (e) => {
    e.preventDefault();
    dispatch(actions.orderAlphabetically(e.target.value));
    setActualPage(1);
    setOrder(!order)
  }

  let handleOrderByRating = (e) => {
    dispatch(actions.orderByRating(e.target.value));
    setActualPage(1);
    setOrder(!order)
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Welcome to Home</h1>
      <SearchBar/>
      <div className={s.containerButtons}>
        <div>
          <Link to='/create'>
            <button className={s.refreshButton} >Create</button>
          </Link>
        </div>
        <div>
          <button className={s.refreshButton} onClick={(e) => handleUpdate(e)}>Reload</button>
        </div>
      </div>
      <div>
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
      </div>
      <Paginate
        gamesByPage={gamesByPage}
        stateVideogames = {stateVideogames.length}
        actualPage = {actualPage}
        paginate = {paginate}
      />

      <div className={s.containerCard}>
        {
          actualGames && actualGames.map(game => {
            return (
              <div className={s.cards} key={game.id}>
                <Link to={`videogame/${game.id}`} >
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