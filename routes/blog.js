const express = require('express');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

// middleware
const author = require('../middleware/author');

const { Blog, validateBlog } = require('../models/blog');

const router = express.Router();

// Requests -->

// get request -> to get all blogs sorted by date
router.get('/', async(req, res)=>{
    const blogs = await Blog.find()
    .sort('-date')
    .select('date title description author')
    .populate('author', 'username email _id');

    res.send(blogs);
});

// get request -> to open a blog
router.get('/:id', async(req, res)=>{
    const blog = await Blog.findById(req.params.id)
    .populate('author', 'username email _id');

    res.send(blog);
});

// post request -> to create a new blog
router.post('/', async(req, res)=>{
    const { error } = validateBlog(req.blog);
    if(error) return res.status(400).send('Invalid Request');

    let blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body
    });

    blog.author = req.user._id;

    blog = await blog.save();

    // also add thid blog to the blog array of author
    let author = await User.findById(req.user._id)
    .select('blogs');

    author.blogs.push(blog._id);
    author = await author.save();

    res.send(blog);
});

// put request -> to edit a blog
router.put('/:id', [author], async(req, res)=>{
    const { error } = validateBlog(req.blog);
    if(error) return res.status(400).send('Invalid Request');

    const blog = await Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        body: req.body.body
    }, {new: true});

    res.json(project);
});

// delete request -> to delete a blog
router.delete('/:id', [author], async(req, res)=>{
    const blog = await Blog.findByIdAndRemove(req.params.id);

    // also remove this blog from its author's array of blogs
    let author = await User.findById(req.user._id)
    .select('blogs');

    author.blogs = author.blogs.filter(
        x => !x.equals(req.params.id)
    );

    author = await author.save();

    res.send(blog);
});

// -->

module.exports = router;