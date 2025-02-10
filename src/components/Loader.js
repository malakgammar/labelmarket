import React from 'react';
import './Loader.css'; // Assurez-vous d'avoir un fichier CSS pour le style

const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner"></div>
            <p>Veuillez passioner! 🤗</p>
        </div>
    );
};

export default Loader;