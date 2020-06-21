import React from 'react'
import AppointmentItem from './AppointmentItem'

const Rest = () => {
    return (
        <div className="col s9">
            <div className="card-panel hoverable" style={{backgroundColor:"black", padding:"10px", borderRadius:"20px"}}>
                <div className="card-content white-text">
                    <h5 className="left-align">Your Appointments:-</h5>

                    <ul className="collapsible popout" style={{marginTop:"25px"}}>
                        <AppointmentItem ad={false}/>
                        <AppointmentItem add={false}/>
                        <AppointmentItem add={true}/>
                    </ul>
                </div>
            </div>

            <div className="card-panel hoverable" style={{backgroundColor:"black", padding:"10px", borderRadius:"20px"}}>
                <div className="card-content white-text">
                    <h5 className="left-align">Your Group Sessions:-</h5>

                    <ul className="collapsible popout" style={{marginTop:"25px"}}>
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Rest
