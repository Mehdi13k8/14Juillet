import React from 'react';
// import './style.css';
import * as d3 from 'd3';
// roue.js import can be added here if it is a JS file
import useHistory from 'react-router-dom';

function ErrorPage() {
    let history = useHistory();

    const handleClick = () => {
        history.push('/');
    }

    return (
        <div id="main">
            <img src="https://www.stellantis.com/content/dam/stellantis-corporate/assets/stell-logo-white.svg" alt="logo" />
            <h1>Nesprávne !</h1>
            <p>Je nám ľúto, ale vaše odpovede nie sú správne</p>
            <br />
            <div className="container_button">
                <button type="button" id="button_home" onClick={handleClick}>Vrátiť sa</button>
            </div>
            <img id="drapo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/langfr-225px-Flag_of_Slovakia.svg.png" alt="slovaquie" />
            <img id="drapo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/langfr-225px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png" alt="france" />
        </div>
    );
}

export default ErrorPage;
