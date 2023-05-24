import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import User from './components/User';
import Redeem from './components/Redeem';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navigate to="/dashboard" />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/user' element={<User />} />
                <Route path='/game' element={<Game />} />
                <Route path='/redeem' element={<Redeem />} />
            </Routes>
        </Router>
    );
}

export default App;
