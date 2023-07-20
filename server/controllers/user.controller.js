const { UserModel } = require('../models/user.model')
const { hash, compare } = require('bcrypt')
// Validation
const { loginValidationSchema, signupValidationSchema } = require('../validations')
// Utils
const { signToken } = require('../utils/token.util')


/**
 * Controller handles User Signup operations.
 */
module.exports.signup = async (req, res) => {

    // Validate request body
    const validation = signupValidationSchema.validate(req.body)
    if (validation.error) {
        return res.status(400)
            .json({ status: false, msg: validation.error })
            .end()
    }

    try {
        // Create a new user
        const new_user = await new UserModel({ 
            ...req.body, 
            password: await hash(req.body.password, 10) 
        }).save()

        // Respond with auth token
        res.status(201)
            .cookie('x-auth-token', signToken(new_user._id.toString()))
            .json({ status: true, data: new_user })
            .end()
    }
    catch (err) {
        console.error({ signup: true, err })
        // Respond with error message
        res.status(400)
            .json({ status: false, msg: 'User already exists' })
            .end()
    }
}


/**
 * Controller handles User Login operations.
*/
module.exports.login = async (req, res) => {

    // Validate request body
    const validation = loginValidationSchema.validate(req.body)
    if (validation.error) {
        return res.status(400)
            .json({ status: false, msg: validation.error })
            .end()
    }

    // Find user
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400)
            .json({ status: false, msg: 'User not found' })
            .end()
    }

    // Compare passwords
    if (await compare(req.body.password, user.password)) {
        // Respond with error (passwords don't match)
        return res.status(200)
            .cookie('x-auth-token', signToken(user._id.toString()))
            .json({ status: true, data: user })
            .end()
    }

    // Respond with error (invalid credentials)
    else return res.status(403)
        .json({ status: false, msg: 'Invalid credentials' })
        .end()
}


/**
 * Controller responds with the User data.
*/
module.exports.getData = async (req, res) => {
    
    // Respond with user data
    res.status(200)
        .json({ status: true, data: req.user })
        .end()
}