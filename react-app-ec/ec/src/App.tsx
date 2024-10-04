import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NuevoExamen from './pages/NuevoExamen';
import Login from './pages/Login';
import Registrarse from './pages/Registrarse';
import MisExamenes from './pages/MisExamenes';
import Examen from './pages/Resolucion';
import { AuthProvider } from './utils/AuthContext';
function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MisExamenes" element={<MisExamenes />} />
            <Route path="/nuevo-examen" element={<NuevoExamen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrarse" element={<Registrarse />} />
            <Route path="/examen/:examenId" element={<Examen />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;