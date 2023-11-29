import React, { useState, useEffect } from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  const [fontSize, setFontSize] = useState('1.5rem');
  const [pFontSize, setPFontSize] = useState('f3');
  const [formHeight, setFormHeight] = useState('pa4'); // Initial height class
  const [pMargin, setPMargin] = useState({ marginLeft: '0', marginRight: '0' }); // Initial margin

  useEffect(() => {
    // Update font sizes and form height based on window width
    const handleResize = () => {
      const newFontSize = window.innerWidth < 600 ? '1rem' : '1.5rem';
      const newPFontSize = window.innerWidth < 600 ? 'f5' : 'f3';
      const newFormHeight = window.innerWidth < 600 ? 'pa2' : 'pa4';
      const newPMargin = window.innerWidth < 600 ? { marginLeft: '20px', marginRight: '20px' } : { marginLeft: '0', marginRight: '0' };

      setFontSize(newFontSize);
      setPFontSize(newPFontSize);
      setFormHeight(newFormHeight);
      setPMargin(newPMargin);
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
      <p className={`${pFontSize}`} style={pMargin}>
        {'This Magic Brain will detect faces in your pictures. Give it a try!'}
      </p>
      <div className='center'>
        <div className={`form center br3 shadow-5 ${formHeight}`}>
          <input className={`${pFontSize} pa2 w-70 center`} type='text' onChange={onInputChange} />
          <button
            className={`w-30 grow f4 link ph3 pv2 dib white bg-light-purple custom-button`}
            style={{ fontSize: fontSize }}
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
