import React, { useState, useEffect } from 'react';

const Rank = ({ name, entries }) => {
  const [margin, setMargin] = useState({ marginLeft: '0', marginRight: '0' });

  useEffect(() => {
    // Update margin based on window width
    const handleResize = () => {
      const isMobile = window.innerWidth < 600;
      const newMargin = isMobile ? { marginLeft: '15px', marginRight: '15px' } : { marginLeft: '0', marginRight: '0' };
      setMargin(newMargin);
    };

    // Initial setup and event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className='white f3' style={margin}>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {`#${entries}`}
      </div>
    </div>
  );
}

export default Rank;
