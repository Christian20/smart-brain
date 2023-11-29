import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  const [logoSize, setLogoSize] = useState({ width: '150px', height: '150px' });
  const [paddingTop, setPaddingTop] = useState('10px');

  useEffect(() => {
    const handleResize = () => {
      const newLogoSize = window.innerWidth < 600 ? { width: '75px', height: '75px' } : { width: '150px', height: '150px' };
      const newPaddingTop = window.innerWidth < 600 ? '0' : '10px';

      setLogoSize(newLogoSize);
      setPaddingTop(newPaddingTop);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='ma4 mt0'>
      <Tilt className='br2 shadow-2' style={{ width: logoSize.width }}>
        <div style={{ height: logoSize.height, background: 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)' }}>
          <div className='pa3'>
            <img alt='logo' style={{ paddingTop }} src={brain} />
          </div>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
