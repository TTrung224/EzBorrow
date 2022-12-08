import React, { useLayoutEffect } from 'react'
import './List.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useState, useEffect} from 'react'

function List() {

    const [ data, setData] = useState([])

    const authAxios = axios.create({
        baseURL: 'http://localhost:4500/',
        withCredentials: true
    })

    useEffect(() => {
        const load = async () => {
            const response = await authAxios.get('/request');
            const data = await response.data;
            console.log(data);
            setData(data);
        };
            load();
    },[]);

    function DisplayBtn(item){
        if(item.student_status =="waiting"){
                return(
                    <div className="card-btns">
                        <button className="cancel-btn">Cancel</button>
                        <button className="approve-btn">Approve</button>
                    </div>
                )
            }
        else if(item.student_status =="ready"){
            return(
                <div className="card-btns">
                    <button className="cancel-btn">Cancel</button>
                    <button className="pickup-btn">Pick up</button>
                    <button className="return-btn">Return</button> 
                </div>
            )
        }
        else if(item.student_status =="picked up"){
            return(
                <div className="card-btns">
                    <button className="return-btn">Return</button>  
                </div>
            )
        }
        else if(item.student_status =="returned"){
            return(
                <div className="card-btns">
                </div>
            )
        }
        else if(item.student_status =="canceled"){
            return(
                <div className="card-btns">
                </div>
            )
        }
    }
    return(
        <div className="card-container">
            {data.map(item =>
            <div className="request-card">
                <div className="card-item-info">
                        <div className="card-info">
                            <p>Request date: {item.createdAt}</p>
                            <p>Borrower email: {item.borrower_email}</p>
                            <p>Pickup date: {item.pickup_date}</p>
                            <p>Expected return day: {item.expected_return_date}</p>
                            <p>Actual return day: {item.actual_return_date}</p>
                            <p>Student status: {item.student_status}</p>
                            <p>Technician stuatus: {item.technician_status}</p>
                        </div>
                        <div className="car-item-list">
                            <p>item list: </p>
                            {item.component_list.map(component =>
                                <ul>
                                    <li>{component.name}</li>
                                    <li>{component.amount}</li>
                                </ul>)}
                        </div>    
                </div>
             
                    {DisplayBtn(item)}
                
                    
                
                
                

            </div>)}
        </div> 
      
        
)}
export default List