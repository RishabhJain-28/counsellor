import React from 'react'
import AppointmentItem from './AppointmentItem'
import { Link } from 'react-router-dom'

const Profile = () => {
    return (
        <div className="col s3">
            <div className="card-panel hoverable" style={{backgroundColor:"black", padding:"10px", borderRadius:"20px"}}>
                <div className="card-content white-text">
                    <h5 className="left-align">Welcome, UserName</h5>
                    {/* <div style={{marginTop:"25px"}}>
                        <Link to="#!"><i className="material-icons right">add</i></Link>
                        <strong><h6 style={{marginTop:"8px", marginBottom:"8px"}}>Your appointments:-</h6></strong>
                        <ul style={{marginTop:"8px", marginBottom:"8px"}}>
                            <AppointmentItem />
                            <AppointmentItem />
                        </ul>
                    </div>
                    <div style={{marginTop:"25px"}}>
                        <Link to="#!"><i className="material-icons right">add</i></Link>
                        <strong><h6 style={{marginTop:"8px", marginBottom:"8px"}}>Your Group Sessions:-</h6></strong>
                        <ul style={{marginTop:"8px", marginBottom:"8px"}}>
                            <AppointmentItem />
                            <AppointmentItem />
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Profile
