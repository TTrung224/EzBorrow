import React from 'react'
import './List.css'
import Button from 'react-bootstrap/Button';

function List() {
  return (
    <div className='dashboard-container'>
        <table className='dashboard-table'>
            <thead>
                <th>Request ID</th>
                <th>Status</th>
                <th>Pickup Date</th>
                <th>Item</th>
                <th>Action</th>
            </thead>
            <tbody>
                <tr>
                    <td>123456</td>
                    <td>Pending</td>
                    <td>10/22/2015</td>
                    <td>Arduino x1</td>
                    <td><Button variant='danger'>Cancel</Button></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default List