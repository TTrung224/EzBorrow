import './App.css';
import Page from './Common/Page'
import Navbar from './Common/Navbar'
import Banner from './Banner'
import Request from './Request/CompoRequest'
import List from './Dashboard/List'
import Login from './login'
import SearchBar from './Common/Search Bar/SearchBar';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import {useState, useEffect} from 'react'
function App() {
  const [auth, setAuth] = useState(false)


  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/hero' element={<><Banner/></>}/>
          <Route path="/">
            <Route index={true} element={<><SearchBar/><Page f1={auth}/></>}/>
            <Route path="dashboard" element={<><SearchBar/><Page/><List/></>}/>
            <Route path="request" element={<><SearchBar/><Page/><Request/></>}/>
          </Route>
          <Route path='/login' element={<><Login f1={v=>setAuth(v)}/></>}/>
        </Routes>
        {!auth && (<Navigate to="/login"/>)}
      </Router>
    </div>
  );
}

export default App;
