import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/offcanvas';
import { Link } from 'react-router-dom';

function Navbar() {

  const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  return (
    <nav style={{ width: '100%'}} className="navbar navbar-dark bg-dark  navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Easy Choice</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <img style={{ width: '100px', height: '100px' }} src='../../public/logo.png' />
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/registrarse">Registrarse</Link></li>
              { !isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li> }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;