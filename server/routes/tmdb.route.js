const router = require('express').Router()
// Controllers
const contentController = require('../controllers/tmdb.controller')
const userMiddleware = require('../middlewares/user.middleware')


/**
 * Route searches for tmdb content and returns it.
 * @method GET
 */
router.get('/search/:q', contentController.search)


/**
 * Route returns all favorite contents.
 * @method GET
*/
router.get('/favorites', userMiddleware.auth, contentController.getFavorites)


/**
 * Route stores a given content id in favorites.
 * @method PUT
 */
router.put('/favorites/:id/:type', userMiddleware.auth, contentController.addToFavorites)


/**
 * Route removes a given content id from favorites.
 * @method DELETE
 */
router.delete('/favorites/:id/:type', userMiddleware.auth, contentController.removeFromFavorites)


module.exports = router