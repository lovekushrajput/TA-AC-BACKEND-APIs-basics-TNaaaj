let mongoose = require('mongoose')
let Schema = mongoose.Schema

let tagSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
    tag: [{type: String}]
}, { timestamps: true })


module.exports = mongoose.model('Tag', tagSchema)