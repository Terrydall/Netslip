const express = require('express');
const router = express.Router();
const modelsOmdb = require('../models/omdb');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Netslip' });
});


/* GET films (list) page. */

function routFilms(req, res, next) {
  res.render('films', {
    films: req.films,
    find: req.params.find,
    nextPage: Number(req.page) + 1,
    beforePage: Number(req.page) - 1
  });
}

router.get('/films/:find', modelsOmdb.getFind, routFilms)
router.get('/films/:find/:page', modelsOmdb.getFind, routFilms);

/* GET film (detail) page. */
router.get('/film/:id', modelsOmdb.getFilmById, (req, res, next) => {
  res.render('film', req.film);
});

/*GET barre de recherche. */
router.get('/search', function (req, res, next) {
  const searchTerm = req.query.search;
  if (searchTerm) {
    //redirection vers la page de films avec le terme de recherche
    res.redirect(`/films/${searchTerm}`);
  } else {
    // gérer le cas où aucun terme de recherche n'est fourni
    res.redirect('/');
  }
});


module.exports = router;
