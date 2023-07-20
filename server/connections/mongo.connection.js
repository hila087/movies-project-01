

/**
 * Function tries to connect to the mongodb database with default configurations.
 */
module.exports.connectToMongo = () => {

    require('mongoose')
        .set('strictQuery', false)
        .connect(process.env['MONGODB_URL'])
        .then(() => console.log('Established connection with mongodb'))
}