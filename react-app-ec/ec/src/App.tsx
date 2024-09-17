import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NuevoExamen from './pages/NuevoExamen';
import Login from './pages/Login';
import Registrarse from './pages/Registrarse';
import ExamenTemplate from './pages/ExamenTemplate';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/examen/:id" element={<ExamenTemplate />} />
        <Route path="/nuevo-examen" element={<NuevoExamen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;