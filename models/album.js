const { Schema, model } = require('mongoose');

const albumSchema = Schema({
    title: { type:String, required:true, unique:true},
    description: { type: String},
    year: { type: Number},
    image: { type: String},
    user: { type: Schema.Types.ObjectId, ref: 'User', required:true},
    artist: {type: Schema.Types.ObjectId, ref: 'Artist', required:true}
}, { collection: 'Albumes'});

module.exports = model('Album', albumSchema);