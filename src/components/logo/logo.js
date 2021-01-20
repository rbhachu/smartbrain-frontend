import React from 'react';
import Tilt from 'react-tilt'; //import statement for react.tilt
import './logo.css'; //import statement for logo.css
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '5px'}} src={brain} alt='logo'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;