import Navbar from "./Navbar"
import Login from './login'
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
    </div>
  );
}

export default App;
