var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment')
var Book = require('../models/Book')


//adding comment
router.post('/:bookId/new', (req, res, next) => {
    let bookId = req.params.bookId
    req.body.bookId = bookId
    Comment.create(req.body, (err, comments) => {
        if (err) return next(err)
        Book.findByIdAndUpdate(bookId, { $push: { commentId: comments._id } }, (err, book) => {
            if (err) return next(err)
            res.redirect('/api/v1Books/' + bookId)
        })
    })
})

//edit comment
router.get('/:id/edit', (req, res, next) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) return next(err)
        res.render('commentEdit', { comment })
    })
})

router.post('/:id/edit', (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
        if (err) return next(err)
        res.redirect('/api/v1Books/' + comment.bookId)
    })
})

//delete
router.get('/:id/delete', (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id, (err, comment) => {
        if (err) return next(err)
        Book.findByIdAndUpdate(comment.bookId, { $pull: { commentId: comment._id } }, (err, book) => {
            if (err) return next(err)
            res.redirect('/api/v1Books/' + comment.bookId)
        })
    })
})



module.exports = router;