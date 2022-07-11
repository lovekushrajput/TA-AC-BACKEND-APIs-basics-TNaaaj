var express = require('express');
var router = express.Router();
var Tag = require('../models/Tags')
var Book = require('../models/Book')

//list all tags
router.get('/', (req, res, next) => {
    Tag.distinct('tag', (err, Tags) => {
        if (err) return next(err)
        res.json({ Tags })
    })
})

// list tags in ascending/descending order
router.get('/', (req, res, next) => {
    Tag.find({}, (err, Tags) => {
        if (err) return next(err)
        Tags.forEach((elm) => {
            res.json(elm.sort)
        })
    })
})

//adding tags
router.post('/:bookId/new', (req, res, next) => {
    let id = req.params.bookId
    req.body.bookId = id
    req.body.tag = req.body.tag.split(',')
    Tag.create(req.body, (err, tag) => {
        if (err) return next(err)
        Book.findByIdAndUpdate(id, { $push: { tagId: tag._id } }, (err, book) => {
            if (err) return next(err)
            res.redirect('/api/v1/Books/' + id)
        })
    })
})


//edit tag
router.post('/:id/edit', (req, res, next) => {
    Tag.findByIdAndUpdate(req.params.id, req.body, (err, tag) => {
        if (err) return next(err)
        res.redirect('/api/v1/Books/' + tag.bookId)
    })
})

//delete
router.delete('/:id/delete', (req, res, next) => {
    let id = req.params.id
    Tag.findByIdAndDelete(id, (err, Tag) => {
        if (err) return next(err)
        Book.findByIdAndUpdate(Tag.bookId, { $pull: { tagId: Tag._id } }, (err, book) => {
            if (err) return next(err)
            res.redirect('/api/v1/Books/' + Tag.bookId)
        })
    })
})

// filter book by tags
router.get('/filter/tag', (req, res, next) => {
    Tag.find(req.body, (err, tag) => {
        tag.forEach((elm) => {
            Book.findById(elm.bookId, (err, book) => {
                if (err) return next(err)
                res.redirect('/api/v1/Books/' + elm.bookId)
            })
        })
    })
})

// count books for each category
router.get('/filter/author', (req, res, next) => {
    console.log(req.body);
    Book.find(req.body, (err, book) => {
        if (err) return next(err)
        book.forEach((elm) => {
            res.redirect('/api/v1/Books/' + elm._id)
        })

    })
})


module.exports = router