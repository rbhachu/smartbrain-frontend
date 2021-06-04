import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from '../assets/brain.png';
import '../css/logo.css'; //import statement for logo.css

const Logo = () => {
    return (
        <div className='ma4 mt0 brain'>
            <Tilt className="Tilt" options={{ max : 99 }} style={{ height: 100, width: 250 }} >
                <img src={brain} alt='SmartBrain' title='SmartBrain' width="100" height="100" />
            </Tilt>
        </div>
    )
}

export default Logo;