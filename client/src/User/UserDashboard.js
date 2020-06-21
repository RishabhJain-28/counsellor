import React, { Fragment, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from '../Components/Navbar'
import AppointmentCollection from './AppointmentCollection'
import GroupSession from './GroupSession'

const UserDashboard = () => {

    useEffect(()=>{
        M.AutoInit();
    },[]);

    return (
        <Fragment>
            <Navbar />
            <div style={{marginTop:"25px", marginBottom:"25px"}}>
                <div className="row" style={{margin:"0px"}}>
                <div className="col s6">
                    <AppointmentCollection />
                </div>  

                <div className="col s6">
                    <GroupSession />
                </div> 
    
                </div>
            </div>
        </Fragment>
    )
}

export default UserDashboard
