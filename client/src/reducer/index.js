import { 
  GET_VIDEOGAMES, 
  GET_GENRES, 
  GET_DETAILS, 
  GET_VIDEOGAME_BY_NAMES, 
  GET_VIDEOGAME_BY_Id, 
  POST_VIDEOGAME 
} from '../actions-types/types';

const initialState = {
  videogames: [],
  genres: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload
      }
     case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      } 
    default: return {...state}
  }
}

export default rootReducer;