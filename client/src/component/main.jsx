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
    <div className="">
      gdgd
    </div>
  );
};

export default Main;
