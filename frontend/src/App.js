import './App.css';
import Page from './Common/Page'
import Navbar from './Common/Navbar'
import Banner from './Banner'
import Request from './Request/CompoRequest'
import List from './Dashboard/List'
import Login from './Common/Login/login';
import SearchBar from './Common/Search Bar/SearchBar';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import {useState, useEffect} from 'react'
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/hero' element={<><Banner/></>}/>
          <Route path="/">
            <Route index={true} element={<><SearchBar/><Page/></>}/>
            <Route path="dashboard" element={<><SearchBar/><Page/><List/></>}/>
            <Route path="request" element={<><SearchBar/><Page/><Request/></>}/>
          </Route>
          <Route path='/login' element={<><Login/></>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
