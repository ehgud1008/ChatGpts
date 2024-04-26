import React, { useState } from 'react';

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendNewMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage.trim()]);
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto p-6 text-white font-sans">
      <div className="flex flex-row gap-4">
        <div className="w-64 bg-chat-light p-4 rounded-lg">
          <button className="bg-chat-accent text-white px-4 py-2 rounded-lg mb-4">+ New Chat</button>
          <p className="mb-2 cursor-pointer">📘 What is Programming?</p>
          <p className="mb-2 cursor-pointer">🔧 How to use an API?</p>
          <div className="mt-8 text-gray-300">
            {/* <p className="flex items-center mb-2 cursor-pointer"><HomeIcon className="h-5 w-5 mr-2" /> Home</p>
            <p className="flex items-center mb-2 cursor-pointer"><SaveIcon className="h-5 w-5 mr-2" /> Saved</p>
            <p className="flex items-center cursor-pointer"><StarIcon className="h-5 w-5 mr-2" /> Upgrade to Pro</p> */}
            <p className="flex items-center mb-2 cursor-pointer"> Home</p>
            <p className="flex items-center mb-2 cursor-pointer"> Saved</p>
            <p className="flex items-center cursor-pointer"> Upgrade to Pro</p>
          
          </div>
        </div>

        <div className="flex-1 bg-chat-light p-4 rounded-lg">
          <div className="mb-4">
            <p>Hi, I am ChatGPT, a state-of-the-art language model...</p>
          </div>
          <div id="chat" className="mb-4 h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="bg-white text-gray-800 p-3 rounded-lg mb-2">
                {message}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-row gap-2">
            <input
              type="text"
              placeholder="Send a message"
              className="w-full px-4 py-2 rounded-lg text-gray-700"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendNewMessage()}
            />
            <button
              className="bg-chat-accent text-white px-4 py-2 rounded-lg"
              onClick={sendNewMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
