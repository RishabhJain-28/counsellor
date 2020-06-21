import React from 'react';
import AppointmentItem from './AppointmentItem';

const GroupSession = () => {
    return (
        <div className="card-panel hoverable" style={{backgroundColor:"white", padding:"10px", borderRadius:"20px"}}>
            <div className="card-content black-text">
                <h5 className="left-align">Your Group Sessions:-</h5>

                <ul className="collapsible popout" style={{marginTop:"25px"}}>
                    <AppointmentItem ad={false}/>
                    <AppointmentItem add={false}/>
                    <AppointmentItem add={true}/>
                </ul>
            </div>
        </div>
    )
};

export default GroupSession
