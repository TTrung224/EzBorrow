import './App.css';
import Page from './Common/Page'
import Navbar from './Common/Navbar'
import Banner from './Banner'
import Components from './Request/Components'
import List from './Dashboard/List'
import Login from './Common/Login/login';
import Loading from './Common/Login/Loading';
import SearchBar from './Common/Search Bar/SearchBar';
import React from 'react'
import {useState, useEffect} from 'react'
import AuthContextProvider from './Context/loginSessionContext'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {

  const [auth, setAuth] = useState({})
  const navigate = useNavigate();

  return (
    <div className="App">
      
      <AuthContextProvider>
        <Navbar/>
          <Routes>
            
            <Route path='/hero' element={<Banner/>}/>
            <Route path="/" element={<Loading/>}>



              {/* <Route path="dashboard" element={<><SearchBar/><Page/><List/></>}/> */}

              {/* Real request */}
              <Route path="request" element={<><SearchBar/><Page/><List/></>}/>

              {/* Real dashboard */}
              <Route path="dashboard" element={<><SearchBar/><Page/><Components/></>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
          </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
