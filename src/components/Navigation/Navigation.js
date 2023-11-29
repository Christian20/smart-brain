import React, { useState, useEffect } from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480); // Adjust the width as needed
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const signInClass = isMobile ? 'f4' : 'f3';

  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signIn')} className={`link dim black underline pa3 pointer ${signInClass}`}>
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signIn')} className={`link dim black underline pa3 pointer ${signInClass}`}>
          Sign In
        </p>
        <p onClick={() => onRouteChange('register')} className={`link dim black underline pa3 pointer ${signInClass}`}>
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
