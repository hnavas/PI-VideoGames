import axios from 'axios';
import { 
  GET_VIDEOGAMES, 
  GET_GENRES, 
  GET_DETAILS, 
  GET_VIDEOGAME_BY_NAMES, 
  GET_VIDEOGAME_BY_Id, 
  POST_VIDEOGAME 
} from '../actions-types/types';

export function getVideogames() {
  return async function(dispatch) {
    let res = await axios.get('http://localhost:3001/videogames');
    return dispatch({
      type : GET_VIDEOGAMES,
      payload: res.data
    });
  }
};

export function getGenres() {
  return async function(dispatch) {
    let res = await axios.get('http://localhost:3001/genres');
    return dispatch({
      type: GET_GENRES,
      payload: res.data
    });
  }
}