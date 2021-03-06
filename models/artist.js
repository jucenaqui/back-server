const { Schema, model } = require('mongoose');

const artistSchema = Schema({
    name: { type: String, required: true},
    description: String,
    image: String,
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

artistSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Artist', artistSchema);