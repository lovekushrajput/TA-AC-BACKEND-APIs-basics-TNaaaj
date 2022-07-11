var express = require('express');
var router = express.Router();
var Book = require('../models/Book')




/* GET books listing. */
router.get('/', function (req, res, next) {
  Book.find({}, (err, Books) => {
    if (err) return next(err)
    res.json({Books})
  })
});

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return next(err)
    res.redirect('/api/v1/Books')
  })
})

//book details
router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Book.findById(id).populate('commentId').populate('categoryId').exec((err, book) => {
    if (err) return next(err)
    res.json({ book })
  })
})

//Edit book
router.put('/:id/edit', (req, res) => {
  let id = req.params.id
  Book.findByIdAndUpdate(id, req.body, (err, book) => {
    if (err) return next(err)
    res.redirect('/api/v1/Books')
  })
})

// delete book
router.delete('/:id/delete', (req, res) => {
  let id = req.params.id
  Book.findByIdAndDelete(id, (err, book) => {
    if (err) return next(err)
    res.redirect('/api/v1/Books')
  })
})



module.exports = router;
