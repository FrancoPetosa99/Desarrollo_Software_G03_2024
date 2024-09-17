import React from 'react';
import Navbar from './Navbar';

function Layout({ children }) {

  const styles = {
    height: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '1rem'
  };

  return (
    <div style={styles}>
        <Navbar />
        { children }
    </div>
  );
}

export default Layout;