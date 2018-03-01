const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artikelSchema = new Schema({
  title: String,
  description: String,
  img: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

let Artikel = mongoose.model('artikel', artikelSchema)
module.exports = Artikel
