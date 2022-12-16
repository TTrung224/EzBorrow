import React, { useLayoutEffect } from 'react'
import './List.css'
import axios from 'axios'
import Moment from 'moment';
import { useState, useEffect} from 'react'
import { requestBtnHandler } from './RequestBtnHandler';

const format = 'DD MMM, yyyy';

function TeacherList() {
    console.log("this is lecturer list")
    const [data, setData] = useState([])
    const [type, setType] = useState("lecturer") 
    // type: "other" "lecturer"

    const Axios = axios.create({
        baseURL: 'http://localhost:4000/',
        withCredentials: true
    })

    useEffect(() => {
        console.log(type);
        console.log("useEffect")
        const load = async () => {
            const accountResponse = await Axios.get("/account/getAccount");
            console.log(accountResponse.data);
            const userEmail = accountResponse.data.email;
            var response;
            if(type == "lecturer"){
                response = await Axios.get('request/myrequest');
            } else if(type == "other"){
                response = await Axios.get('request/lecturer/' + userEmail);
            }
            var data = await response.data;
            console.log(data);
            setData(data);
        };
            load();
    },[type]);

    function DisplayOtherBtn(item){
        if(item.lecturer_status == "pending" ){
            return(
                <div className="card-btns">
                    <button onClick={() => requestBtnHandler("cancel", item._id)} className="cancel-btn">Cancel</button>
                    <button onClick={() => requestBtnHandler("approve", item._id)} className="approve-btn">Approve</button>
                </div>
            )
        }
    }

    function DisplayLecturerBtn(item){
        if(!(item.technician_status == "approved" || item.technician_status == "canceled")){
            return(
                <div className="card-btns">
                  <button onClick={() => requestBtnHandler("cancel", item._id)} className="cancel-btn">Cancel</button>
                </div>
            )}   
    }

    return(
        <div>
            <div>
                <button className='type-btn my-requests' onClick={()=>setType("lecturer")}>My Request</button>
                <button className='type-btn others-requests' onClick={()=>setType("other")}>Others' Request</button>
            </div>

            <div className="card-container">
                {[...data].reverse().map(request =>
                <div className="request-card">
                    <div className="card-item-info">
                        <div className="card-info">
                            <p>Request date: {Moment(new Date(request.createdAt)).format(format)}</p>
                            <p>Borrower email: {request.borrower_email}</p>
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
                        {(type=="other") && DisplayOtherBtn(request)}
                        {(type=="lecturer") && DisplayLecturerBtn(request)}
                </div>)}
            </div> 
        </div>
    )

}
export default TeacherList