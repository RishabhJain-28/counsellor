import React from 'react'
import { Link } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css';

const Navbar = () => {
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper" style={{backgroundColor:"rgb(26, 83, 92)"}}>
                    <Link to="/" className="brand-logo" style={{paddingLeft:"10px"}}>Mental Health</Link>
                    <ul className="right">
                        <li><Link to="/user"><i className="material-icons left">account_circle</i>DashBoard</Link></li>
                        <li><Link to="#!"><i className="material-icons left">exit_to_app</i>LogOut</Link></li
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar