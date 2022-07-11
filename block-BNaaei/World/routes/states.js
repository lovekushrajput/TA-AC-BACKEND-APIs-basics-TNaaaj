var express = require('express');
var router = express.Router();
var State = require('../models/State')
var Country = require('../models/Country')

/* GET users listing. */
router.get('/', function (req, res, next) {
    State.find({}, (err, countries) => {
        if (err) return next(err)
        res.json(countries)
    })
});

//create country
router.post('/new', (req, res, next) => {
    State.create(req.body, (err, countries) => {
        if (err) return next(err)
        res.redirect('/api/v2/states')
    })
})

//update
router.put('/:id/update', (req, res, next) => {
    State.findByIdAndUpdate(req.params.id, { $push: req.body }, (err, state) => {
        console.log(state);
        if (err) return next(err)
        res.redirect('/api/v2/states')
    })
})

//delete
router.delete('/:id/delete', (req, res, next) => {
    State.findByIdAndDelete(req.params.id, (err, state) => {
        if (err) return next(err)
        Country.findById(state.country, { $pull: { states: state._id } }, (err, country) => {
            if (err) return next(err)
            res.redirect('/api/v2/states')
        })
    })
})

// list all states in an ascending order of their population
router.get('/population', (req, res, next) => {
    State.find({}, (err, states) => {
        if (err) return next(err)
        res.json(states.sort((a, b) => a.population - b.population))
    })
})

// for a particular state, list all neighbouring states
router.get('/:id/neighbour', (req, res, next) => {
    State.findById(req.params.id).populate('neighbouring_states').exec((err, state) => {
        if (err) return next(err)
        res.json(state)
    })
})

module.exports = router;
