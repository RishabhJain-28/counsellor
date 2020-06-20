import React from 'react'
import BlogItem from './BlogItem'

const BlogCollection = ({blogs}) => {
    return (
        <div className="row" style={{marginTop:"20px", padding:"15px"}}>
            {
                blogs.map(
                    blog => <BlogItem blog={blog} key={blog.id} />
                )
            }
        </div>
    )
}

export default BlogCollection
