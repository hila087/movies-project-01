const { sign } = require('jsonwebtoken')

/**
 * Function returns a signed token with the given information.
 */
module.exports.signToken = (_id) => sign({ _id }, process.env['AUTH_SECRET'])