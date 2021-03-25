const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const User = new mongoose.Schema({
    name: { type: String, required: true },
    active: { type: String, required: true, default: false },
},
{
    timestamps: true,
});

User.plugin(mongoosePaginate);

module.exports = mongoose.model('user', User);

