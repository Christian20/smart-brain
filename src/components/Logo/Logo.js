import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className='br2 shadow-2' style={{width: '150px'}}>
                <div style={{ height: '150px', background: 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)' }}>
                    <div className='pa3'>
                        <img style={{paddingTop: '10px'}} alt='logo' src={brain}/>
                    </div>
                    
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;