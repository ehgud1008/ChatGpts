import React, { useState, useRef } from 'react';

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebar, setIsSidebar] = useState(false);
  const [loadInterval, setLoadInterval] = useState(null);

  //프롬프트 textarea 세팅
  const textarea = useRef();
  const handleResizeHeight = () => {
    if(textarea && textarea.current){
      textarea.current.style.height = 'auto'; //height 초기화
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
      textarea.current.style.maxHeight = '250px';
      textarea.current.style.resize = 'none';
    }
  };

  const loader = () => {
    setLoadInterval( () => {
      
    })
  }

  const handleSendPrompt = async (e) => {
    e.preventDefault();
    
  };

  const chatStript = (isAi, value, uniqueId) => {
    return (
      <div className = "wrap ${isAi && 'ai'}">
        <div className="chat">
          
        </div>
      </div>
    )
  }
  return (
    <div className="flex h-screen">
        {/* <!-- Sidebar --> */}
        {/* {isSidebar && ( */}
          <div className="w-2/12 px-8 py-4 bg-white border-r">
              <h1 className="text-2xl font-semibold">ChatGPTs</h1>
              
              {/* <ul className="mt-8">
                  <li className="mb-4 active-link p-2">Explore GPTs</li>
                  <li className="mb-4 p-2">DesignerGPT</li>
                  <li className="mb-4 p-2">Image Generator</li>
                  <li className="mb-4 p-2">Video Maker</li>
                  <li className="mb-4 p-2">More Tools</li>
              </ul> */}
          </div>
        {/* )} */}

        {/* <!-- Main content --> */}
        <div className="flex-1 p-10">
            <select className='absolute right-10 top-10 border rounded-lg p-2'>
              <option value="">ChatGPT 4</option>
              <option value="">English Chat Bot</option>
            </select>
            <h2 className="text-2xl font-bold mt-20 mb-10">How can I help you today?</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="card p-4 bg-white border rounded-lg">
                    <h3 className="font-semibold">Suggest fun activities</h3>
                    <p>Help me make friends in a new city</p>
                </div>
                <div className="card p-4 bg-white border rounded-lg">
                    <h3 className="font-semibold">Recommend a dish</h3>
                    <p>Bring to a potluck</p>
                </div>
                <div className="card p-4 bg-white border rounded-lg">
                    <h3 className="font-semibold">Plan an itinerary</h3>
                    <p>Fashion-focused exploration of Paris</p>
                </div>
            </div>
            {/* <!-- Footer --> */}
            <form onSubmit={handleSendPrompt()}>
              <div className="absolute right-0 bottom-0 w-10/12 bg-gray-100 p-4">
                  <div className="flex justify-between items-center">
                      <textarea type="text" placeholder="Message ChatGPT..." rows={1} ref={textarea} onChange={handleResizeHeight} className="p-2 w-full border rounded-lg" />
                      <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
                  </div>
              </div>
            </form>
        </div>

    </div>
  );
};

export default Main;
