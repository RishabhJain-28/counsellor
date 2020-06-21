import React from 'react'
import{Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { readBlog } from '../actions/blogAction';

const BlogItem = ({blog, readBlog}) => {
    const {title, body, id} = blog;

    const onClick = () => {
        readBlog(id);
    };

    return (
        <div className="col s4">
            <div className="card-panel hoverable" style={{padding:"10px", borderRadius: "15px", position:"relative", backgroundColor:"rgb(255, 107, 107)"}}>
                <div className="card-content white-text" style={{overflow:"hidden", height: "150px"}}>
                    <p className="right">Author's Name</p>
                    <h5 className="card-title white-text">{title}</h5>
                    <p>{body}</p>
                </div>
                <div className="card-action" style={{marginTop:"5px"}}>
                <Link to="/blog" onClick={onClick} className="btn-small white black-text"><strong>Read</strong></Link>
                </div>

            </div>
        </div>
    )
};

export default connect(
    null,
    {readBlog}
)(BlogItem)