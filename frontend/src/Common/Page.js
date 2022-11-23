import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Request from '../Request/Request'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Page() {
    return (
        <div>
            <Router>
            <Navbar/>
            </Router>
            <Sidebar/>
            <Request/>
        </div>
    )
}

export default Page