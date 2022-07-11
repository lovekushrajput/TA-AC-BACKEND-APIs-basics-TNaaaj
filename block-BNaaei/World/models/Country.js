let mongoose = require('mongoose')
let Schema = mongoose.Schema

let countrySchema = new Schema({
    name: { type: String, required: true },
    states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
    continent: { type: String, required: true },
    population: { type: String, required: true },
    religions: [{ type: String, required: true }],
    neighbouring_countires: [{ type: Schema.Types.ObjectId , ref: 'Country'}],
    area: { type: String, required: true }
})

module.exports = mongoose.model('Country', countrySchema)