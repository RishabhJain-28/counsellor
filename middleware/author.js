const { Blog } = require('../models/blog');

module.exports = async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    .select('author');

    if(blog.author.equals(req.user._id)){
        next();
    }else{
        res.send("You are not the author of this blog");
    }
};