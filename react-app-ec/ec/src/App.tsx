import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NuevoExamen from './pages/NuevoExamen';
import Login from './pages/Login';
import Registrarse from './pages/Registrarse';
import MisExamenes from './pages/MisExamenes';
import EditarExamen from './pages/EditarExamen' 
import Notas from './pages/Historia'
import Examen from './pages/Examen';
import { AuthProvider } from './utils/AuthContext';
function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/misExamenes" element={<MisExamenes />} />
            <Route path="/nuevoExamen" element={<NuevoExamen />} />
            <Route path="/editar/examen/:examenId" element={<EditarExamen />} />
            <Route path="/notas/:examenId" element={<Notas />} />
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