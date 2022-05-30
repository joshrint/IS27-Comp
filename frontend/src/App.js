import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import NewBoat from './NewBoat';

//Router Homepage
function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/new" element={<NewBoat/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
