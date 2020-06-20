import React, { Fragment, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import BlogCollection from '../Blog/BlogCollection';
import { connect } from 'react-redux';

import { loadBlogs } from '../actions/blogAction'


const LandingPage = ({ blog: {blogs, blogLoading}, loadBlogs }) => {

    useEffect(()=>{
        if(blogs.length === 0){
            loadBlogs();
        }
    },[]);

    return (
        <Fragment>
            <Navbar />
            <div className="row">
                <div className="col s10 offset-s1">
                    <h3 style={{color: "rgb(78, 205, 196)"}}>Recent Blogs</h3>
                    {
                        blogLoading ?
                            null
                        :
                        <BlogCollection blogs={blogs}/>
                    }
                </div>
            </div>
        </Fragment>
    )
};

const mapStateToProps = state => ({
    blog : state.blog
});

export default connect (
    mapStateToProps,
    { loadBlogs }
)(LandingPage);