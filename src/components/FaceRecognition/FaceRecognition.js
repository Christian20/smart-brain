import React, { useState, useEffect } from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    const [imageWidth, setImageWidth] = useState('100%');

    useEffect(() => {
        // Calculate the width dynamically based on window width and desired margins
        const calculateImageWidth = () => {
            const windowWidth = window.innerWidth;
            const desiredMargins = 40; // 20px on each side
            const newWidth = windowWidth - desiredMargins;
            setImageWidth(`${newWidth}px`);
        };

        // Call the function initially and on window resize
        calculateImageWidth();
        window.addEventListener('resize', calculateImageWidth);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', calculateImageWidth);
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div className='center ma'>
        <div className='absolute mt2'>
            <img id='inputimage' alt='' src={imageUrl} style={{ width: imageWidth, height: 'auto' }} />
            {Array.isArray(boxes) && boxes.map((box, index) => (
            <div
                key={index}
                className='bounding-box'
                style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
                }}
            ></div>
            ))}
        </div>
        </div>
    );
}

export default FaceRecognition;
