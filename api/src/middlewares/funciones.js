const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const urlApi = "https://api.rawg.io/api/";

const getVideogameApi = async () => {
  const dataApi = [];
  let pag = 1;
  while (pag <= 5) { 
    const urlOfApi = await axios.get(`${urlApi}games?key=${API_KEY}&page=${pag}`);
    const getDataApi = await urlOfApi.data.results.map(vg => {
      const allData = {
        id: vg.id, 
        name: vg.name,
        image: vg.background_image,
        genres: vg.genres.map(genre => genre.name),
        rating: vg.rating,
        platforms: vg.platforms.map(el => el.platform.name),
        released: vg.released,
      };
      dataApi.push(allData);
    })
    pag++;

  }
  return dataApi;
};

const getVideogameDB = async () => {
  const vgDB = await Videogame.findAll({
    include: {
      model: Genre, 
      attributes: ['name'],
      through: {
        attributes: [],
      }, 
    }
  }); 
  const arrVgDB = vgDB.map(el => {
    return {
      id: el.id,
      name: el.name,
      genres: el.Genres.map(el => el.name),
      rating: el.rating
    }
  })
  return arrVgDB;
};

const getAllVideogame = async () => {
  const apiData = await getVideogameApi();
  const dbData = await getVideogameDB(); 
  const totalData = apiData.concat(dbData);
  return totalData;
}

const filterById = async (id) => {
  if (!isNaN(id)) {
    const findById = await axios.get(`${urlApi}games/${id}?key=${API_KEY}`);
    return {
      id: findById.data.id,
      name: findById.data.name,
      image: findById.data.background_image,
      description: findById.data.description_raw,
      released: findById.data.released,
      rating: findById.data.rating,
      platforms: findById.data.platforms.map(p => p.platform.name),
      genres: findById.data.genres.map(g => g.name),
    };
  } else {
    return await Videogame.findByPk(id, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  }
};

const getAllGenres = async () => {
  const dataApi = await axios.get(`${urlApi}genres?key=${API_KEY}`);
  const allGenres = await dataApi.data.results.map(el => el.name);
  allGenres.forEach(genre => {
    Genre.findOrCreate({
      where: {
        name: genre
      }
    })
  });
  const allGenresDB = await Genre.findAll();
  return allGenresDB;
}

module.exports = {
  getAllVideogame,
  getAllGenres,
  filterById,
};