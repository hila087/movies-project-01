const { Tmdb } = require('../utils/tmdb.util')
const { UserModel } = require('../models/user.model')


/**
 * Controller handles content searching operations.
 */
module.exports.search = async (req, res) => {

    const q = req.params['q']
    try {
        const tmdb = new Tmdb()
        const data = await tmdb.search(q)
        res.status(200)
            .json({ status: true, data })
            .end()
    }
    catch (err) {
        console.error({root: 'search', err})
        res.status(500)
            .json({ status: false, msg: 'Something went wrong' })
            .end()
    }
}


/**
 * Controller adds a given tmdb-content id into favorites.
 */
module.exports.addToFavorites = async (req, res) => {

    const id = req.params['id'], type = req.params['type']
    const id_key = `${id}:${type === 'tv' ? 'tv' : 'movie'}`
    try {
        await UserModel.findByIdAndUpdate(req.user._id, {$addToSet: { favorites: id_key }})
        res.status(200)
            .json({ status: true })
            .end()
    }
    catch (err) {
        res.status(500)
            .json({ status: false, msg: 'Something went wrong' })
            .end()
    }
}


/**
 * Controller removes a given tmdb-content id from favorites.
 */
module.exports.removeFromFavorites = async (req, res) => {

    const id = req.params['id'], type = req.params['type']
    const id_key = `${id}:${type === 'tv' ? 'tv' : 'movie'}`
    try {
        await UserModel.findByIdAndUpdate(req.user._id, {$pull: { favorites: id_key }})
        res.status(200)
            .json({ status: true })
            .end()
    }
    catch (err) {
        res.status(500)
            .json({ status: false, msg: 'Something went wrong' })
            .end()
    }
}


/**
 * Controller returns the favorite contents as a detailed list.
 */
module.exports.getFavorites = async (req, res) => {

    try {
        const tmdb = new Tmdb()
        const data = await tmdb.get_favorites(req.user.favorites)
        if (data.bad_ids?.length) {
            await UserModel.findByIdAndUpdate(req.user._id, {$pull: { favorites: { $in: data.bad_ids } }})
            console.log('Bad IDs removed:', data.bad_ids)
        }
        res.status(200)
            .json({ status: true, data: { ...data, bad_ids: undefined } })
            .end()
    }
    catch (err) {
        console.error({root: 'favs', err})
        res.status(500)
            .json({ status: false, msg: 'Something went wrong' })
            .end()
    }
}