let mongoose = require('mongoose')
let Schema = mongoose.Schema

let stateSchema = new Schema({
    name: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    population: { type: String, required: true },
    neighbouring_states: [{ type: Schema.Types.ObjectId ,ref: 'State' }],
    area: { type: String, required: true }
})

module.exports = mongoose.model('State', stateSchema)