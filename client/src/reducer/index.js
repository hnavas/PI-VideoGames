import { 
  GET_VIDEOGAMES, 
  GET_GENRES, 
  GET_DETAILS, 
  GET_VIDEOGAME_BY_NAMES, 
  GET_VIDEOGAME_BY_Id, 
  POST_VIDEOGAME, 
  ORDER_ALPHABETICALLY,
  ORDER_BY_RATING,
  FILTER_BY_STATUS,
  FILTER_BY_GENRES,
} from '../actions-types/types';

const initialState = {
  videogames: [],
  allFilteredGames: [],
  genres: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allFilteredGames: action.payload
      }
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      }
    case ORDER_ALPHABETICALLY:
      const sortedGamesName = action.payload === 'az' ?
        state.videogames.sort((a, b) => {
          if(a.name > b.name) return 1;
          if(b.name > a.name) return -1;
          return 0;
        }) :
        state.videogames.sort((a, b) => {
          if(a.name > b.name) return -1;
          if(b.name > a.name) return 1;
          return 0;
        });
    return {
      ...state,
      videogames: sortedGamesName
    }
    case ORDER_BY_RATING:
      const sortedByRating = action.payload === 'high' ?
      state.videogames.sort((a, b) => {
        if(a.rating < b.rating) return 1;
        if(b.rating < a.rating) return -1;
        return 0;
      }) :
      state.videogames.sort((a, b) => {
        if(a.rating < b.rating) return -1;
        if(b.rating < a.rating) return 1;
        return 0;
      });
    return {
      ...state,
      videogames: sortedByRating
    }
    case FILTER_BY_GENRES:
      const allGenresVideogames = state.allFilteredGames;
      const filteredByGenre = action.payload === 'all' ?
        allGenresVideogames :
        allGenresVideogames.filter(game => game.genres.includes(action.payload));
      return {
        ...state,
        videogames: filteredByGenre
      }
    case FILTER_BY_STATUS:
      const allGames = state.allFilteredGames;
      let filteredGames = [];
      if(action.payload === 'all'){
        filteredGames = allGames;
      }else if(action.payload === 'created') {
        filteredGames = allGames.filter(game => isNaN(game.id))
      } else {
        filteredGames = allGames.filter(game => !isNaN(game.id))
      } 
      return {
        ...state,
        videogames: filteredGames
      } 
    default: 
      return state;
  }
}

export default rootReducer;