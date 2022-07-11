let mongoose = require('mongoose')
let Schema = mongoose.Schema

let bookSchema = new Schema({
    title: String,
    summary: String,
    pages: Number,
    publication: String,
    // author-details
    name: String,
    email: String,
    city: String,
    tags: [String],
    commentId: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    categoryId: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    tagId: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
}, { timestamps: true })


module.exports = mongoose.model('Book', bookSchema)