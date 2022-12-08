import './App.css';
import Page from './Common/Page'
import Navbar from './Common/Navbar'
import Banner from './Banner'
import Request from './Request/CompoRequest'
import List from './Dashboard/List'
import Login from './Common/Login/login';
import SearchBar from './Common/Search Bar/SearchBar';
import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {

  const [auth, setAuth] = useState()
  const navigate = useNavigate();


  const authAxios = axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true
  })

  useEffect(() => {
    const check = async () => {
      const response = await authAxios.get('/account/getAccount')
      const auth = response.data;
      setAuth(auth);
      if(auth !== 'lecturer' || auth !== 'student' || auth !== 'technician'){
        navigate("/hero", {replace: true})
      } else {
        navigate("/", {replace: true})
      }
    }
    check();
  },[]);


  return (
    <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/hero' element={<><Banner/></>}/>
          <Route path="/">
            <Route index={true} element={<><SearchBar/><Page auth={auth}/></>}/>
            <Route path="dashboard" element={<><SearchBar/><Page/><List/></>}/>
            <Route path="request" element={<><SearchBar/><Page/><Request/></>}/>
          </Route>
          <Route path='/login' element={<><Login/></>}/>
        </Routes>
      {Login}
    </div>
  );
}

export default App;
