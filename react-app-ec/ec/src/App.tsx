import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NuevoExamen from './pages/NuevoExamen';
import Login from './pages/Login';
import Registrarse from './pages/Registrarse';
import MisExamenes from './pages/MisExamenes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mis-examenes" element={<MisExamenes />} />
        <Route path="/nuevo-examen" element={<NuevoExamen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;