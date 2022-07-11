var express = require('express');
var router = express.Router();
var Category = require('../models/Category')
var Book = require('../models/Book')

//list all categories
router.get('/', (req, res, next) => {
    Category.distinct('category', (err, categories) => {
        if (err) return next(err)
        res.json({ categories })
    })
})

//adding category
router.post('/:bookId/new', (req, res, next) => {
    let id = req.params.bookId
    req.body.bookId = id
    req.body.category = req.body.category.split(',')
    // console.log(req.body);
    Category.create(req.body, (err, category) => {
        if (err) return next(err)
        Book.findByIdAndUpdate(id, { $push: { categoryId: category._id } }, (err, book) => {
            if (err) return next(err)
            res.redirect('/api/v1/Books/' + id)
        })
    })
})


//edit comment
router.post('/:id/edit', (req, res, next) => {
    Category.findByIdAndUpdate(req.params.id, req.body, (err, category) => {
        if (err) return next(err)
        res.redirect('/api/v1/Books/' + category.bookId)
    })
})

//delete
router.delete('/:id/delete', (req, res, next) => {
    let id = req.params.id
    Category.findByIdAndDelete(id, (err, category) => {
        if (err) return next(err)
        Book.findByIdAndUpdate(category.bookId, { $pull: { categoryId: category._id } }, (err, book) => {
            if (err) return next(err)
            res.redirect('/api/v1/Books/' + category.bookId)
        })
    })
})

//list books by category
router.get('/filter/category', (req, res, next) => {
    Category.find(req.body, (err, category) => {
        category.forEach((elm) => {
            Book.findById(elm.bookId, (err, book) => {
                if (err) return next(err)

                res.redirect('/api/v1/Books/' + elm.bookId)
            })
        })
    })
})

// count books for each category
router.get('/filter/author', (req,res,next)=>{
    console.log(req.body);
            Book.find(req.body, (err, book) => {
                if (err) return next(err)
            book.forEach((elm)=>{
                res.redirect('/api/v1/Books/' + elm._id)
            })

            })
})


module.exports = router