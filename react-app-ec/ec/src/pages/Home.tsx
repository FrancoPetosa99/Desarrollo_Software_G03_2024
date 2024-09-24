import React from 'react';
import Layout from '../components/Layout';

import fondo from "../images/fondoGenerico.jpg"
function Home() {
    return (
        <>
            <Layout>
                <div style={{ backgroundImage: `url(${fondo})` }}>
                    Hello World
                </div>
            </Layout>
        </>
    );
};

export default Home;