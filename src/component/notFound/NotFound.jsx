import React from 'react';
import { Link } from 'react-router-dom';
import imageNotFound from '../../assets/notfound.png'
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

const NotFound = () => (
    <div className="not-found">
        <Header />
        <img style={{ height: '80vh' }} src={imageNotFound}
            alt="not-found"
        />

        {/* <Link to="/" className="link-home">
            Go Home
        </Link> */}
        <Footer />
    </div>
);

export default NotFound;