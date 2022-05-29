import './App.css';
import {BrowserRouter as Router, Switch, Routes, Route} from 'react-router-dom';
import Home from './Home';
import EditBoat from './EditBoat';

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/edit/:id" element={<EditBoat/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
