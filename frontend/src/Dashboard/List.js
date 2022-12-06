import React from 'react'
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



  return (
    <div className='dashboard-container'>
        <table className='dashboard-table'>
            <thead>
                <td>Request ID</td>
                <td>Status</td>
                <td>Pickup Date</td>
                <td>Item</td>
                <td>Action</td>
            </thead>
            <tbody>
                {data.map(item => 
                    <tr>
                        <td>{item._id}</td>
                        <td>{item.lecturer_status}</td>
                        <td>{item.pickup_date.slice(0,10)}</td>
                        <td>Arduino x1</td>
                        <td><Button variant='danger' className='action-btn'>Cancel</Button></td>
                    </tr>   
                )}
            </tbody>
        </table>
    </div>
  )
}

export default List