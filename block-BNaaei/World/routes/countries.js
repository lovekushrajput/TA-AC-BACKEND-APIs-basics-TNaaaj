var express = require('express');
var router = express.Router();
var Country = require('../models/Country')
var State = require('../models/State')

/* GET countries listing. */
router.get('/', function (req, res, next) {
  Country.find({}, (err, countries) => {
    if (err) return next(err)
    res.json({ countries })
  })
});

//create country
router.post('/new', (req, res, next) => {
  req.body.religions = req.body.religions.split(',')
  Country.create(req.body, (err, countries) => {
    if (err) return next(err)
    res.redirect('/api/v1/countries')
  })
})


// update/delete a country

router.put('/:id/update', (req, res, next) => {
  Country.findByIdAndUpdate(req.params.id, { $push: req.body }, (err, country) => {
    console.log(country);
    if (err) return next(err)
    res.redirect('/api/v1/countries')
  })
})


router.put('/:id/state', (req, res, next) => {
  Country.findByIdAndUpdate(req.params.id, { $push: req.body }, (err, country) => {
    if (err) return next(err)
    res.redirect('/api/v1/countries')
  })
})

//delete
router.delete('/:id/delete', (req, res, next) => {
  Country.findByIdAndDelete(req.params.id, (err, country) => {
    if (err) return next(err)
    // remove a state from any country
    State.findById(country.states, { $pull: { country: country._id } }, (err, state) => {
      if (err) return next(err)
      res.redirect('/api/v1/countries')
    })
  })
})

// list all states for a country in ascending/descending order
router.get('/:id/states', (req, res, next) => {
  Country.findById(req.params.id).populate('states').exec((err, country) => {
    if (err) return next(err)
    res.json(country.states)
  })
})

// for a particular country, list all neighbouring countires
router.get('/:id/neighbour', (req, res, next) => {
  Country.findById(req.params.id).populate('neighbouring_countires').exec((err, countries) => {
    if (err) return next(err)
    res.json(countries)
  })
})

// list all religions present in entire country dataaset
router.get('/religians', (req, res, next) => {
  Country.distinct('religions', (err, religians) => {
    if (err) return next(err)
    res.json({ religians })
  })
})

// list countries based on religions
router.get('/filter/religions', (req, res, next) => {
  let religians = req.body

  Country.find(religians, (err, countries) => {
    if (err) return next(err)
    res.json(countries)
  })
})

// list countries based on continent
router.get('/filter/continent', (req, res, next) => {
  Country.find(req.body, (err, countries) => {
    if (err) return next(err)
    res.json(countries)
  })
})

// list countries based on population
router.get('/filter/population', (req, res, next) => {
  Country.find(req.body, (err, countries) => {
    if (err) return next(err)
    res.json(countries)
  })
})

module.exports = router;
