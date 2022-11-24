import './App.css';
import Page from './Common/Page'
import Navbar from './Common/Navbar'
import Banner from './Banner'
import Request from './Request/CompoRequest'
import List from './Dashboard/List'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/hero' element={<Banner/>}/>
          <Route path="/">
            <Route index={true} element={<><Page/></>}/>
            <Route path="dashboard" element={<><Page/><List/></>}/>
            <Route path="request" element={<><Page/><Request/></>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
