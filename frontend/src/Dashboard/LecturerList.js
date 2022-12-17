import React, { useLayoutEffect } from 'react'
import './List.css'
import axios from 'axios'
import Moment from 'moment';
import { useState, useEffect} from 'react'
import { requestBtnHandler } from './RequestBtnHandler';

const format = 'DD MMM, yyyy';

function TeacherList() {
    const [data, setData] = useState([])
    const [type, setType] = useState("lecturer") 
    // type: "other" "lecturer"

    const Axios = axios.create({
        baseURL: 'http://localhost:4000/',
        withCredentials: true
    })

    useEffect(() => {
        var userEmail;

        const searchDiv = document.querySelector('.search .search-bar');
        if(type == "lecturer"){
            searchDiv.classList.add("hidden");
        }else{
            searchDiv.classList.remove("hidden");
        }

        const load = async () => {
            const accountResponse = await Axios.get("/account/getAccount");
            userEmail = accountResponse.data.email;
            var response;
            if(type == "lecturer"){
                response = await Axios.get('request/myrequest');
            } else if(type == "other"){
                response = await Axios.get('request/lecturer/' + userEmail);
            }
            var data = await response.data;
            // console.log(data);
            setData(data);
        };
        load();

        if(type == "other"){
            const searchInput = document.getElementById("search-input");
            searchInput.value = "";
            searchInput.placeholder = "borrower email"
            const handleInputChange = async (event) => {
                if(searchInput.value != ""){
                    const response = await Axios.get('request/lecturer-search/'+userEmail+'?email='+searchInput.value);
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
        }

    },[type]);

    // useEffect(() => {
    //     if(type == "other"){
    //         const searchInput = document.getElementById("search-input");
    //         searchInput.addEventListener("keyup", async (event) => {
    //             if(searchInput.value != ""){
    //                 const response = await Axios.get('/request/search?email='+searchInput.value);
    //                 const data = await response.data;
    //                 console.log(data);
    //                 setData(data);
    //             }else{
    //                 load();
    //             }
    //         })
    //     }
    // }, [])

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
            )
        }   
    }

  
    return(
        <div>
            <div>
                <button className={(type=="lecturer")?"type-btn my-requests lec-active":"type-btn my-requests"} onClick={()=>setType("lecturer")}>My Request</button>
                <button className={(type=="other")?"type-btn others-requests lec-active":"type-btn others-requests"} onClick={()=>setType("other")}>Others' Request</button>
            </div>
            {(data.length===0) && <p style={{textAlign: "center"}}>There have not been any requests</p>}

            <div className="card-container">
                {[...data].reverse().map(request =>
                <div className="request-card">
                    <div className="card-item-info">
                        <div className="card-info">
                            <p>Request date: {Moment(new Date(request.createdAt)).format(format)}</p>
                            <p>Borrower email: {request.borrower_email}</p>
                            <p>Course: {request.course}</p>
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
                        {(type=="other") && DisplayOtherBtn(request)}
                        {(type=="lecturer") && DisplayLecturerBtn(request)}
                </div>)}
            </div> 
        </div>
    )

}
export default TeacherList