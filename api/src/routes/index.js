const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameMiddleware = require('../middlewares/videogame.js');
const genreMiddleware = require('../middlewares/genre.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogame', videogameMiddleware);
router.use('/genre', genreMiddleware);


module.exports = router;
