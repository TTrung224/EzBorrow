import React, { useLayoutEffect } from 'react'
import './List.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Moment from 'moment';
import { useState, useEffect} from 'react'
import { requestBtnHandler } from './RequestBtnHandler';

const format = 'DD MMM, yyyy';

function TechnicianList() {
    const [data, setData] = useState([])

    const Axios = axios.create({
        baseURL: 'http://localhost:4000/',
        withCredentials: true
    })

    useEffect(() => {
        const load = async () => {
            const response = await Axios.get('/request/');
            var data = await response.data;
            console.log(data);
            setData(data);
        };
        load();

        const searchInput = document.getElementById("search-input");
        searchInput.value = "";
        searchInput.placeholder = "borrower or lecturer email"
        const handleInputChange = async (event) => {
            if(searchInput.value != ""){
                const response = await Axios.get('request/technician-search?email='+searchInput.value);
                const data = await response.data;
                console.log(data);
                setData(data);
            }else{
                load();
            }
        }
        searchInput.addEventListener("keyup", handleInputChange)

        return () => {
            searchInput.removeEventListener('keyup', handleInputChange);
        };
    },[]);

    function DisplayBtn(item){
        if(item.student_status == "waiting" && item.lecturer_status == "approved"){
            return(
                <div className="card-btns">
                    <button onClick={() => requestBtnHandler("cancel", item._id)} className="cancel-btn">Cancel</button>
                    <button onClick={() => requestBtnHandler("approve", item._id)} className="approve-btn">Approve</button>
                </div>
            )
        }
        else if(item.student_status == "ready"){
            return(
                <div className="card-btns">
                    <button onClick={() => requestBtnHandler("pickUp", item._id)} className="pickup-btn">Pick up</button>
                </div>
            )
        }
        else if(item.student_status == "picked up"){
            return(
                <div className="card-btns">
                    <button onClick={() => requestBtnHandler("return", item._id)} className="return-btn">Return</button>
                </div>
            )
        }
        else if(item.student_status == "returned"){
            return(
                <div className="card-btns">
                </div>
            )
        }
        else if(item.student_status == "canceled"){
            return(
                <div className="card-btns">
                </div>
            )
        }
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
                        <p>Course: {request.course}</p>
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
export default TechnicianList