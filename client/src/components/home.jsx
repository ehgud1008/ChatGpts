import React, { useState, useRef } from 'react';
import bot from '../images/bot.svg';
import user from '../images/user.svg';

const Home = () => {
  const [loadingInterval, setLoadingInterval] = useState(null);

  const [isNonePrompt, setIsNonePrompt] = useState(false);
  const [stripe, setStripe] = useState([]);
  const [loadingText, setLoadingText] = useState('');
  
  const messageEndRef = useRef(null);

  //프롬프트 textarea 세팅
  const textarea = useRef();
  const handleResizeHeight = (e) => {
    if(textarea && textarea.current){
      textarea.current.style.height = 'auto'; //height 초기화
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
      textarea.current.style.overflow = 'hidden';
      textarea.current.style.resize = 'none';
    }
  };

  const loader = (element) => {
    // element.textContent = 'gdgdgd';
    // console.log(element);
    setLoadInterval( () => {
      
    })
  }
  const chatContainer = useRef();
  const handleSendPrompt = async () => {
    setIsNonePrompt(true);  //프롬프트 첫 입력 여부
    
    //유저 메시지(프롬프트)
    const prompt = textarea.current.value;
    const userMessage = {
      id: Math.random().toString(36).substr(2, 9), // 랜덤 ID 생성
      isAi : false,
      prompt: prompt
    }

    // Add user message to the chat
    setStripe([...stripe, userMessage]);
    
    let dots = '';
    const intervalDot = setInterval(() => {
        dots += '.';
        if (dots.length > 4) dots = '.';
        setLoadingText(`${dots}`);
    }, 300);

    // Start loading animation
    startLoadingAnimation(intervalDot);

    const uniqueId = generateUniqueId(); 
    console.log(loadingInterval);
    try{
      const option = {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
          prompt: prompt
        })
      }
      // const response = await fetch('http://localhost:3000/', option);
      const response = await fetch('/server/responseBot', option);
      const data = await response.json();

      console.log(data);
      stopLoadingAnimation(intervalDot);

      const botMessage = {
          id: uniqueId,
          isAi: true,
          prompt: data.bot.content
      };
      setStripe(stripe => [...stripe, botMessage]);
      textarea.current.value = ''; // 입력 필드 초기화
      textarea.current.style.height = 'auto'; // 높이 초기화
    
    }catch(error){
      console.error(error); 
    }
  };

  const chatStript = (isAi, value, uniqueId) => {
    return `
      <div className="wrap ${isAi && 'ai'}">
        <div className="chat">
          <img src="${isAi ? bot : user}" alt="${isAi ? 'bot' : 'user' }"/>
        </div>
        <div className="message text-lg" id="${uniqueId}">${value}</div>
      </div>
    `
  }

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const random = Math.random();
    const hexaString = random.toString(16);

    return `id-${timestamp}-${hexaString}`;
  }

  // Start loading animation
  const startLoadingAnimation = (interval) => {
    console.log(interval);
    setLoadingInterval(interval);
  };
  // Stop loading animation
  const stopLoadingAnimation = (interval) => {
    console.log(interval)
    clearInterval(interval);
    setLoadingText('');
    setLoadingInterval(null);
  };

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
            <select title='gpts' className='absolute right-10 top-5 border rounded-lg p-2'>
              <option value="">ChatGPT 4</option>
              <option value="">English Chat Bot</option>
            </select>
            
            <div className="text-md mt-16 pb-28">
              {/* 프롬프트 있냐? (로딩중이냐? 응 : 아니) : 아니 */}
              {isNonePrompt ? 
                <div className='text-lg'>
                  {stripe.map(msg => (
                    msg.isAi ? (
                      <div key={msg.id} className='mt-5'>
                        <div className="profile flex items-center">
                              <img src={msg.isAi ? bot : user} alt={msg.isAi ? 'bot' : 'user'} /> <span className='ml-3 text-xl'>Bot</span>
                          </div>
                          <div className="whitespace-pre-wrap mt-2 ml-8">{msg.prompt.replace(/\+/g, '\n')}</div>
                      </div>
                    ) : (
                      <div key={msg.id} className={`mt-5 message ${msg.isAi ? 'bot' : 'user'}`}>
                          <div className="profile flex items-center">
                              <img src={msg.isAi ? bot : user} alt={msg.isAi ? 'bot' : 'user'} /> <span className='ml-3 text-xl'>You</span>
                          </div>
                          <div className="whitespace-pre-wrap mt-2">{msg.prompt}</div>
                      </div>
                    )
                  ))}
                  <div>{loadingText}</div>
                  <div ref={messageEndRef} />
                </div>
                 : (
                  <div>
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
                </div>
              )}
            </div>
            {/* <!-- Footer --> */}
            {/* <div className="absolute right-0 bottom-0 w-10/12 bg-gray-100 p-4">
                <div className="flex justify-between items-center">
                    <textarea type="text" id="prompt" placeholder="Message ChatGPT..." rows={1} ref={textarea} onChange={handleResizeHeight} className="p-2 w-full border rounded-lg" />
                    <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSendPrompt}>Send</button>
                </div>
            </div> */}
            <div className='flex'>
              <div className="fixed right-0 bottom-0 w-10/12 bg-gray-100 p-4">
                  <div className="flex justify-between items-center mx-auto" style={{ maxWidth: '90%' }}>
                      <textarea type="text" id="prompt" placeholder="Message ChatGPT..." rows={1} ref={textarea} onChange={handleResizeHeight} className="p-2 w-full border rounded-lg" />
                      <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSendPrompt}>Send</button>
                  </div>
              </div>
            </div>
        </div>

    </div>
  );
};

export default Home;
