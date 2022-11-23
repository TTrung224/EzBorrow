import React from 'react'
import Request from '../Request/Request'
import Sidebar from './Sidebar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Page() {
    return (
        <div className='main-page'>
            <Router>
            </Router>
            <Request/>
            <Sidebar/>
        </div>
    )
}

export default Page