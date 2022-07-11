var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment')
var Book = require('../models/Book')


//adding comment
router.post('/:bookId/new', (req, res, next) => {
    let id = req.params.bookId
    req.body.bookId = id
    Comment.create(req.body, (err, comments) => {
        if (err) return next(err)
        Book.findByIdAndUpdate(comments.bookId, { $push: { commentId: comments._id } }, (err, book) => {
            if (err) return next(err)
            console.log(book, 'in');
            res.redirect('/api/v1/Books/' + id)
        })
    })
})

//edit comment
router.post('/:id/edit', (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
        if (err) return next(err)
        res.redirect('/api/v1/Books/' + comment.bookId)
    })
})

//delete
router.delete('/:id/delete', (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id, (err, comment) => {
        if (err) return next(err)
        Book.findByIdAndUpdate(comment.bookId, { $pull: { commentId: comment._id } }, (err, book) => {
            if (err) return next(err)
            res.redirect('/api/v1/Books/' + comment.bookId)
        })
    })
})



module.exports = router;