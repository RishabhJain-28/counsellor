import React, { Fragment } from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

const BlogPage = ({blog: { readBlog }}) => {

    return (
        <Fragment>
            <Navbar />
            <Fragment>
            {
                readBlog ?
                    <div className="container" style={{marginTop: "20px", marginBottom: "20px", borderRadius:"20px", padding:"10px", borderRadius:"15px", backgroundColor:"rgb(78, 205, 196)"}}>
                        <h3 className="black-text">{readBlog.title}</h3>
                        <div style={{marginTop: "20px"}}>
                            <p className="black-text">Author :-</p>
                            <Link to="#!"><p className="black-text" style={{marginTop:"5px", marginBottom:"5px"}}><i className="material-icons small left">person_pin</i>Author's username</p></Link>
                            <p className="black-text" style={{marginTop:"5px", marginBottom:"5px"}}>Author's Email</p>
                        </div>
                        <div style={{padding:"10px", marginTop:"15px"}}>
                            <p className="black-text left-align">
                                {readBlog.body}
                            </p>
                        <p className="right-align black-text">Published on:- Date</p>
                        </div>
                    </div>
                :
                null
            }
            </Fragment>
        </Fragment>
    )
};

const mapStateToProps = state => ({
    blog: state.blog
});

export default connect(
    mapStateToProps,
    {}
)(BlogPage)