let mongoose = require('mongoose')
let Schema = mongoose.Schema

let categorySchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
    category: [{type: String}]
}, { timestamps: true })


module.exports = mongoose.model('Category', categorySchema)