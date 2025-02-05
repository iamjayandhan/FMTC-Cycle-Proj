import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Main/MainPage';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
