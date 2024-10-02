import React from 'react';
import Navbar from './Navbar';
import { AuthProvider } from '../utils/AuthContext';
function Layout({ children }) {

  const styles = {
    height: 'auto',
    width: '100%',
    gap: '1rem'
  };

  return (
      <div style={styles}>
          <AuthProvider>
            <Navbar />
                  {children}
          </AuthProvider>
    </div>
  );
}

export default Layout;