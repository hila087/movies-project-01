const { UserModel } = require('../models/user.model')
const { verify } = require('jsonwebtoken')


/**
 * Middeware validates a token from the request cookies.
 */
module.exports.auth = async (req, res, next) => {
    const token = req.cookies['x-auth-token']
    if (!token) {
        // Invalid token
        return res.status(401).json({ status: false, msg: 'Invalid token' })
    }
    try {
        const payload = verify(token, process.env["AUTH_SECRET"])
        // Token is verified - store user in request
        req['user'] = await UserModel.findById(payload._id)
        return next()
    }
    catch (err) {
        // Invalid token
        return res.status(403).json({ status: false, msg: 'Invalid token' })
    }
}