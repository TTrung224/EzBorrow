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

  const [auth, setAuth] = useState({})
  const navigate = useNavigate();


  const authAxios = axios.create({
    baseURL: 'http://localhost:4500/',
    withCredentials: true
  })

  useEffect(() => {
    const check = async () => {
      const response = await authAxios.get('/account/getAccount').then((response) => {
        //success
        navigate("/", {replace: true})
      }).catch((error) => {
        navigate("/hero", {replace: true})
      })
      console.log(response.data)
      const auth = response.data
      console.log("auth===============", auth)
      if(!(auth.type === 'lecturer' || auth.type === 'student' || auth.type === 'technician')){
        console.log()
        console.log('hello world')
        console.log(auth.type)
        console.log(auth.name)
        console.log(typeof(auth.type))
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
            {/* <Route index={true} element={<><SearchBar/><Page auth={auth}/></>}/> */}
            <Route index={true} element={<><Page auth={auth}/></>}/>

            {/* <Route path="dashboard" element={<><SearchBar/><Page/><List/></>}/> */}

            {/* Real request */}
            <Route path="request" element={<><SearchBar/><Page/><List auth={auth}/></>}>
            </Route>

            {/* Real dashboard */}
            <Route path="dashboard" element={<><SearchBar/><Page/><Request/></>}/>
          </Route>
          <Route path='/login' element={<><Login auth={auth} setAuth={setAuth}/></>}/>
        </Routes>
      {Login}
    </div>
  );
}

export default App;
