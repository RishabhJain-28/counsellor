import React, { Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

const Login = () => {
    return (
        <Fragment>
            <div className="container">
                <div className="row" style={{marginTop:"100px"}}>
                    <div className="col s8 offset-s2" style={custom}>
                    <h3 className="center white-text">Login</h3>
                    <a href="/signup"><p className="center white-text">Create a New Account</p></a>
                        <form>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input name="username" type="text" className="white-text" style={{borderBottomColor:'white'}} />
                                    <label htmlFor="username" className="active white-text ">UserName</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input name="password" type="password" className="white-text" style={{borderBottomColor:'white'}} />
                                    <label htmlFor="password" className="active white-text ">Password</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                        className="btn white black-text" 
                                        style={{borderRadius:"15px"}}
                                        type="submit"
                                        value="Login"
                                    />
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

const custom = {
    backgroundColor: "rgb(78, 205, 196)",
    borderRadius: "20px"
};

export default Login
