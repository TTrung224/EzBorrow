import React from 'react'
import './List.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useState, useEffect} from 'react'
import { FaEnvelopeSquare } from 'react-icons/fa';

function List() {

    const [ data, setData] = useState([])
    const [ auth, setAuth] = useState('student')

    const authAxios = axios.create({
        baseURL: 'http://localhost:4500/',
        withCredentials: true
    })

    useEffect(() => {
        const check = async () => {
            const response = await authAxios.get('/account/getAccount')
            const auth = response.data;
            console.log('auth:', auth);
            setAuth(auth);

        }

        const load = async () => {
            if(auth.type === 'technician') {
                const response = await authAxios.get('/request');
                const data = await response.data;
                console.log(data);
                setData(data);
            } else{
                const response = await authAxios.get('/request/myRequest');
                const data = await response.data;
                console.log(data);
                setData(data);
            }
        };

        check();
        load();
    },[]);



  return (
    <div className='dashboard-container'>
        <table className='dashboard-table'>
            <thead>
                <td>Request Date</td>
                <td>Pickup Date</td>
                <td>Status</td>
                <td>Return Date</td>
                <td>Item</td>
                <td>Action</td>
            </thead>
            <tbody>
                {data.map(item => 
                    <tr>
                        <td>{item.pickup_date.slice(0,10)}</td>
                        <td>{item.lecturer_status}</td>
                        <td>{item.return_date}</td>
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