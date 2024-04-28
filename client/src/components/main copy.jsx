import React, { useState, useRef } from 'react';
import bot from '../images/bot.svg';
import user from '../images/user.svg';

const Main = () => {
    const [stripe, setStripe] = useState([]);
    const [loadingText, setLoadingText] = useState('');
    const [loadingInterval, setLoadingInterval] = useState(null);
    const textarea = useRef();

    // Handle dynamic resizing of the textarea
    const handleResizeHeight = (e) => {
        if(textarea && textarea.current){
            textarea.current.style.height = 'auto';
            textarea.current.style.height = `${textarea.current.scrollHeight}px`;
        }
    };

    // Generate a unique ID for each message
    const generateUniqueId = () => {
        return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    };

    // Start loading animation
    const startLoadingAnimation = () => {
        let dots = '';
        const intervalId = setInterval(() => {
            dots += '.';
            if (dots.length > 4) dots = '.';
            setLoadingText(`Loading${dots}`);
        }, 300);

        setLoadingInterval(intervalId); // Save the interval ID for later cleanup
    };

    // Stop loading animation
    const stopLoadingAnimation = () => {
        clearInterval(loadingInterval);
        setLoadingText('');
        setLoadingInterval(null);
    };

    // Handle sending the prompt
    const handleSendPrompt = async () => {
        const promptText = textarea.current.value;
        const userMessage = {
            id: generateUniqueId(),
            isAi: false,
            prompt: promptText
        };

        // Add user message to the chat
        setStripe([...stripe, userMessage]);

        // Start loading animation
        startLoadingAnimation();

        // Simulate a server request
        try {
            const response = await simulateServerResponse(promptText);
            stopLoadingAnimation();
            const botMessage = {
                id: generateUniqueId(),
                isAi: true,
                prompt: response
            };
            setStripe(stripe => [...stripe, botMessage]);
        } catch (error) {
            stopLoadingAnimation();
            console.error('Failed to fetch response:', error);
        }
        textarea.current.value = '';
    };

    // Dummy function to simulate server response
    const simulateServerResponse = (prompt) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("This is the response from the server based on the prompt.");
            }, 2000);
        });
    };

    return (
        <div className="flex h-screen">
            <div className="w-2/12 px-8 py-4 bg-white border-r">
                <h1 className="text-2xl font-semibold">ChatGPTs</h1>
            </div>
            <div className="flex-1 p-10">
                <textarea ref={textarea} onChange={handleResizeHeight} placeholder="Message ChatGPT..." className="w-full border rounded-lg p-2" />
                <button onClick={handleSendPrompt} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
                {stripe.map(msg => (
                    <div key={msg.id} className={`message ${msg.isAi ? 'bot' : 'user'}`}>
                        <div className="profile">
                            <img src={msg.isAi ? bot : user} alt={msg.type} />
                        </div>
                        <div className="text">{msg.prompt}</div>
                    </div>
                ))}
                {loadingInterval && <div>{loadingText}</div>}
            </div>
        </div>
    );
};

export default Main;
