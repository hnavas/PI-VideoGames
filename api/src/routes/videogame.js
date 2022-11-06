const express = require('express');
const fn = require('../middlewares/funciones');
const { Videogame, Genre } = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const {name} = req.query;
  let allVideogames = await fn.getAllVideogame();
  if(name) {
    let filteredByName = await allVideogames.filter(vg => vg.name.toLowerCase().includes(name.toLowerCase()));
    filteredByName.length ?
    res.status(200).send(filteredByName) :
    res.status(404).send('No se encontro el Videogame'); 
  } else {
    res.status(200).json(allVideogames);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let findedGame = await fn.filterById(id);
  if(!findedGame) return res.status(404).send('Videogame not finded');
  res.status(200).json(findedGame);
});

router.post('/', async (req, res) => {
  const { name, description, released, rating, platforms, createdInDB, genre  } = req.body;
  if(!name || !description || !platforms) return res.status(404).send('Faltan datos obligatorios');
  const videogameCreated = await Videogame.create({
    name,
    description,
    released,
    rating,
    platforms,
    createdInDB,
  });
  const genreBD = await Genre.findAll({
    where: { 
       name: genre 
      }
  });
  videogameCreated.addGenres(genreBD);
  res.status(200).send('Videogame created successfully ')

});
module.exports = router;