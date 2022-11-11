import axios from 'axios';
import { 
  GET_VIDEOGAMES, 
  GET_GENRES, 
  GET_VIDEOGAME_BY_NAME, 
  GET_VIDEOGAME_BY_Id, 
  POST_VIDEOGAME,
  FILTER_BY_STATUS,  
  FILTER_BY_GENRES,
  ORDER_ALPHABETICALLY,
  ORDER_BY_RATING
} from '../actions-types/types';

export function getVideogames() {
  return async function(dispatch) {
    let res = await axios.get('http://localhost:3001/videogames');
    return dispatch({
      type : GET_VIDEOGAMES,
      payload: res.data
    });
  }
}

export function getByName(name) {
  return async function(dispatch) {
    let res = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    return dispatch({
      type : GET_VIDEOGAME_BY_NAME,
      payload: res.data
    });
  }
}

export function getById(id) {
  return async function(dispatch) {
    let res = await axios.get(`http://localhost:3001/videogames/${id}`);
    return dispatch({
      type: GET_VIDEOGAME_BY_Id,
      payload: res.data
    });
  }
}

export function getGenres() {
  return async function(dispatch) {
    let res = await axios.get('http://localhost:3001/genres');
    return dispatch({
      type: GET_GENRES,
      payload: res.data
    });
  }
}

export function postVideogame(payload) {
  return async function(dispatch) {
    let res = await axios.post('http://localhost:3001/videogames', payload);
    return res;
  }
}

//Ordenamiento y Filtrado

export function filterByStatus(payload) {
  return {
    type: FILTER_BY_STATUS,
    payload
  }
}

export function filterByGenres(payload) {
  return {
    type: FILTER_BY_GENRES,
    payload
  }
}

export function orderAlphabetically(payload) {
  return {
    type: ORDER_ALPHABETICALLY,
    payload
  }
}

export function orderByRating(payload) {
  return {
    type: ORDER_BY_RATING,
    payload
  }
}