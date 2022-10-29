const express = require('express');
const fn = require('./funciones.js');
const { Videogame, Genere } = require('../db')
const router = express.Router();

router.get('/', async (req, res) => {
  const allGenresDB = await fn.getAllGenres();
  allGenresDB ?
  res.status(200).send(allGenresDB) :
  res.status(404).send('No hay Genres');
});

module.exports = router;
