const router = require('express').Router()
// Controllers, Middlewares
const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')


/**
 * Route handles user sign-up operations.
 * @method POST
 */
router.post('/sign-up', userController.signup)

/**
 * Route handles user login operations.
 * @method POST
 */
router.post('/login', userController.login)

/**
 * Route sends user data (with authorization).
 * @method GET
 */
router.get('/', userMiddleware.auth, userController.getData)


module.exports = router