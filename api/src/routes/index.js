const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameMiddleware = require('./videogame');
const genreMiddleware = require('./genre');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogameMiddleware);
router.use('/genres', genreMiddleware);


module.exports = router;
