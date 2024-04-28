import React, { useState } from 'react'

const Test = () => {
    const [loadingText, setLoadingText] = useState('');

    const startLoadingEffect = () => {
      let count = 0;
      const maxDots = 4;
  
      const intervalId = setInterval(() => {
        setLoadingText(prev => {
          if (prev.length < maxDots) {
            return prev + '.';
          } else {
            return '';
          }
        });
        // count++;
        // if (count > 10) {  // Optionally limit the number of cycles
        //   clearInterval(intervalId);
        //   setLoadingText(''); // Optionally clear loading text at the end
        // }
      }, 300);
    };
  
    const handleLoad = () => {
      startLoadingEffect();
    };
  
    return (
      <div>
        <button onClick={handleLoad}>Start Loading</button>
        <div>Loading{loadingText}</div>
      </div>
    );
  };

export default Test