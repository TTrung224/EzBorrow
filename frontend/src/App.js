import Navbar from "./Common/Navbar"
import Login from './login'
import Request from './Request/Request'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
      <Request/>
    </div>
  );
}

export default App;
