import React from 'react';
import Layout from '../components/Layout';

import fondo from "../images/fondoGenerico.jpg"
function Home() {
    return (
        <>
            <Layout>
                <div
                    style={{
                        width: "100vw",  
                        height: "100vh", 
                        backgroundImage: `url(${fondo})`,
                        backgroundSize: "cover",  
                        backgroundPosition: "center", 
                        backgroundRepeat: "no-repeat", 
                    }}
                >
                    HOME
                </div>
            </Layout>
        </>
    );
};

export default Home;