import React, { Fragment } from 'react';

const AppointmentItem = ({add}) => {
    return (
        <li style={{marginTop:"10px"}}>
            {
                add ?
                    <Fragment>
                        <div className="collapsible-header" style={{backgroundColor:"rgb(78, 205, 196)"}}>Book an Appointment</div>
                        <div className="collapsible-body" style={{backgroundColor:"rgb(78, 205, 196)"}}>
                            <div>
                                <form>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input name="from" type="text" className="black-text" style={{borderBottomColor:'black'}} />
                                        <label htmlFor="from" className="active black-text ">From:-</label>
                                    </div>

                                    <div className="input-field col s6">
                                        <input name="to" type="text" className="black-text" style={{borderBottomColor:'black'}} />
                                        <label htmlFor="to" className="active black-text ">To:-</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name="counsellor" type="text" className="black-text" style={{borderBottomColor:'black'}} />
                                        <label htmlFor="counsellor" className="active black-text ">Counsellor:-</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name="message" type="text" className="black-text" style={{borderBottomColor:'black'}} />
                                        <label htmlFor="message" className="active black-text ">Add Message:-</label>
                                    </div>
                                </div>

                                <input className="btn white black-text" 
                                    type="submit"
                                    value="Book"
                                />
                                </form>
                            </div>
                        </div>
                    </Fragment>
                :
                    <Fragment>
                        <div className="collapsible-header" style={{backgroundColor:"rgb(78, 205, 196)"}}>From - To</div>
                        <div className="collapsible-body" style={{backgroundColor:"rgb(78, 205, 196)"}}>
                            <div>
                                <p style={pCustom}>Schedule :- From - To</p>
                                <p style={pCustom}>Your Counsellor:- Counsellor's UserName</p>
                                <p style={pCustom}>Message:- Message Body</p>
                                <p className="right" style={pCustom}><a href="#!" className="black-text">Open</a></p>
                            </div>
                        </div>
                    </Fragment>   
            }
        </li>
    )
};

const pCustom = {
    marginTop:"2px",
    marginBottom:"2px"
}

export default AppointmentItem
