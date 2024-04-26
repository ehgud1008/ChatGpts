import React from 'react'

const PromptLoading = () => {
  const [dots, setDots] = useState('');
  const [loadInterval, setLoadInterval] = useState(null);

  useEffect(() => {
    // const intervals = ['.', '..', '...', '....'];
    // let currentInterval = 0;
    const dot = '';
    setLoadInterval(() => {
      dot += '.';
      if(dot === '....'){
        setDots('');
      }
      setDots(dot);
    }, 300); // Update every 300 milliseconds
  }, []);

  return <div>{dots}</div>;
}

export default PromptLoading