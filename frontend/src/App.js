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
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {

  const [auth, setAuth] = useState()
  const navigate = useNavigate();
  console.log(auth)
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
     setAuth(auth);
    }
    
    if(!auth) {
      navigate("/login", { replace: true });
    } else {
      navigate("/", {replace: true});
    }
  }, []);



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
