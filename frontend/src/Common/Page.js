import React from 'react'
import Request from '../Request/Request'
import Sidebar from './Sidebar'
import RequestCompo from '../Request/CompoRequest'
import List from '../Dashboard/List'
import { BrowserRouter as Navigate, Route, Routes } from "react-router-dom";

function Page({f1}) {
    return (
        <div className='main-page'>
                <Routes>
                    <Route path='/page/request' element={<RequestCompo/>}/>
                    <Route path='/page/dashboard' element={<List/>}/>
                </Routes>
                <Sidebar/>
                <Request/>
        </div>
    )
}

export default Page