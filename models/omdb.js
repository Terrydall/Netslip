const axios = require('axios');
const API_KEY = '8a0eb5a9';
const URL_API = `http://www.omdbapi.com/?apikey=${API_KEY}`;




// Fonction pour récupérer les résultats de recherche
async function getFind(req, res, next) {
    const { find } = req.params;
    req.page = req.params.page ?? 1;
    try {
        const response = await axios.get(URL_API + `&s=${find}&page=${req.page}`);

        if (response.data.Response === 'True') {

            req.films = response.data["Search"];
            next();
            //res.render('films', { films });
        } else {
            res.status(404).json({ error: 'Aucun film trouvé pour cette catégorie.' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ eror: 'Erreur serveur.' });
    }
}

// Fonction pour récupérer les détails d'un film par ID
async function getFilmById (req, res, next) {
    const { id } = req.params;

    try {
        const response = await axios.get(URL_API + `&i=${id}`);

        if (response.data.Response === 'True') {
            req.film = response.data;
            next();
            //res.render('film', { film });
        } else {
            res.status(404).json({ error: 'Aucun détail trouvé pour ce film.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ eror: 'Erreur serveur.' });
    }

}

module.exports = {
    "getFind": getFind,
    "getFilmById": getFilmById
}