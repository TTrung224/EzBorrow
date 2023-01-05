import React from 'react'
// import { useLayoutEffect } from 'react'
import './List.css'
// import Button from 'react-bootstrap/Button';
import {axiosSetting} from '../Context/serverURLContext';
import Moment from 'moment';
import { useState, useEffect} from 'react'
import { requestBtnHandler } from './RequestBtnHandler';

const format = 'DD MMM, yyyy';

function Studentist() {
    const [data, setData] = useState([])
    const [btnPress, setBtnPress] = useState(" ")

    useEffect(() => {
        const searchDiv = document.querySelector('.search .search-bar');
        searchDiv.classList.add("hidden");

        const load = async () => {
            const response = await axiosSetting.get('request/myrequest');
            var data = await response.data;
            // console.log(data);
            setData(data);
        };
        
        setTimeout(()=>{
            load();
        }, 800)
    
    },[btnPress]);

    function DisplayBtn(item){
        // waiting pending approved cancel
        if(!(item.technician_status === "approved" || item.technician_status === "canceled" || item.student_status === "canceled")){
            return(
                <div className="card-btns">
                  <button onClick={() => {requestBtnHandler("cancel", item._id); setBtnPress("cancel"+item._id)}} className="cancel-btn">Cancel</button>
                </div>
            )}   
    }

    return(
        <div>
            {(data.length===0) && <p style={{textAlign: "center"}}>There have not been any requests</p>}
            <div className="card-container">
            {[...data].reverse().map(request =>
            <div className="request-card">
                <div className="card-item-info">
                    <div className="card-info">
                        <p>Request date: {Moment(new Date(request.createdAt)).format(format)}</p>
                        <p>Borrower email: {request.borrower_email}</p>
                        <p>Lecturer email: {request.lecturer_email}</p>
                        <p>Pickup date: {Moment(new Date(request.pickup_date)).format(format)}</p>
                        <p>Expected return day: {Moment(new Date(request.expected_return_date)).format(format)}</p>
                        <p>Actual return day: 
                            {request.hasOwnProperty("actual_return_date") &&
                                " " + Moment(new Date(request.actual_return_date)).format(format)}
                            {!request.hasOwnProperty("actual_return_date") &&
                                " not yet returned"}</p>
                        <p>Lecturer status: {request.lecturer_status}</p>
                        <p>Technician status: {request.technician_status}</p>
                        <p>Student status: {request.student_status}</p>
                    </div>
                    <div className="car-item-list">
                        <p>item list: </p>
                        {request.component_list.map(component =>
                            <ul>
                                <li>{component.name} &emsp; x {component.amount}</li>
                            </ul>)}
                        <p>note: </p>
                        <p>{request.note}</p>
                    </div>    
                </div>    
                    {DisplayBtn(request)}
            </div>)}
        </div> 
        </div>
        
        
      
        
)}
export default Studentist