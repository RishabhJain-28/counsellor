const mongoose = require('mongoose');
const Joi = require('joi');
const moment = require('moment');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {  
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        default: moment().format('ll')
    }
});

function validateBlog(blog){
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        body: Joi.string().required()
    };

    return Joi.validate(blog, schema);
};

const Blog = mongoose.model('Blog', blogSchema);

exports.Blog = Blog;
exports.validateBlog = validateBlog;