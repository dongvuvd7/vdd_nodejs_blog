const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, maxlength: 255, required: true, },
    description: { type: String, },
    image: { type: String, maxlength: 255 },
    slug: {type: String},
    videoId: {type: String, required: true},
    level: {type: String},
    slug: { type: String, slug: 'name', unique: true }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', Course);