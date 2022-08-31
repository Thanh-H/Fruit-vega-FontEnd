import React from 'react';
import { Link } from 'react-router-dom';
import imageNotFound from '../../assets/notfound.png'

const NotFound = () => (
    <div className="not-found">
        <img src={imageNotFound}
            alt="not-found"
        />
        <Link to="/" className="link-home">
            Go Home
        </Link>
    </div>
);

export default NotFound;