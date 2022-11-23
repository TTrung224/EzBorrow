import './App.css';
import Page from './Common/Page'
import Navbar from './Common/Navbar'
import Banner from './Banner'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route></Route>
        </Routes>
        <Navbar/>
      </Router>
      <Page/>
    </div>
  );
}

export default App;
