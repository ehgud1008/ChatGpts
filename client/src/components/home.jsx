import React, { useState, useRef, useEffect } from 'react';
import bot from '../images/bot.svg';
import user from '../images/user.svg';
import { useDispatch } from 'react-redux'
import {saveMessage} from '../_actions/message_actions';
const Home = () => {
  const [loadingInterval, setLoadingInterval] = useState(null); //로딩...interval 세팅
  const [loadingText, setLoadingText] = useState('');           //.... 세팅
  const [isNonePrompt, setIsNonePrompt] = useState(false);      //첫 프롬프트 여부
  const [stripe, setStripe] = useState([]);                     //메시지 리스트
  const [isInputText , setIsInputText] = useState(false);       //프롬프트 빈 값 여부(send 버튼 활성화 여부)
  const [isProceeding, setIsProceeding] = useState(false);      //프롬프트 전송 진행 중 여부(send/중지 버튼)

  //프롬프트 textarea 세팅
  const textarea = useRef();
  const botType = useRef();

  const dispatch = useDispatch();
  useEffect( () => {
    eventQuery('WelcomeToChatBot');
  },[]);

  const handleResizeHeight = () => {  //프롬프트 textarea Onchange
    if(textarea && textarea.current.value !== ''){
      textarea.current.style.height = 'auto'; //height 초기화
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
      textarea.current.style.overflow = 'hidden';
      textarea.current.style.resize = 'none';

      setIsInputText(true);
    }else{
      setIsInputText(false);
    }
  };

  //텍스트쿼리 전송 함수 
  const textQuery = async (text) => {
    //1. 보낸 메시지 관리
    let conversation = {
      who : 'user',
      content : {
        text: {
          text: text,
        }
      }
    }

    //유저 conversation데이터 > 리덕스 스토어에 넣고 저장
    dispatch(saveMessage(conversation));
    console.log("User : " + conversation);

    //2. 챗봇이 보낸 메시지 처리
    try {
      const textQuertOption = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }), // JSON 문자열로 변환
      }
      const response = await fetch('/server/dialogflow/textQuery', textQuertOption);
      const data = await response.json();

      const content = data.fulfillmentMessages[0];

      conversation = {
        who: 'bot',
        content : content
      }

      //봇 conversation데이터 > 리덕스 스토어에 넣고 저장
      dispatch(saveMessage(conversation));
      console.log("Bot : " + conversation);
    } catch (error) {
      let conversation = {
        who: 'bot',
        content : {
          text: {
            text: '문제가 발생했습니다.'
          }
        }
      }
      //봇 conversation데이터 > 리덕스 스토어에 넣고 저장
      dispatch(saveMessage(conversation));
      console.log(conversation);
    }
  }

  //텍스트쿼리 전송 함수 
  const eventQuery = async (event) => {
    //2. 챗봇이 보낸 메시지 처리
    try {
      const eventQuertOption = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event: event }), // JSON 문자열로 변환
      }
      const response = await fetch('/server/dialogflow/eventQuery', eventQuertOption);
      const data = await response.json();

      const content = data.fulfillmentMessages[0];

      let conversation = {
        who: 'bot',
        content : content
      }
      //봇 conversation데이터 > 리덕스 스토어에 넣고 저장
      dispatch(saveMessage(conversation));
      console.log(conversation);
    } catch (error) {
      let conversation = {
        who: 'bot',
        content : {
          text: {
            text: '문제가 발생했습니다.'
          }
        }
      }
      //봇 conversation데이터 > 리덕스 스토어에 넣고 저장
      dispatch(saveMessage(conversation));
      console.log(conversation);
    }
  }


  /** Send버튼 클릭 함수 */
  const handleSendPrompt = (e) => {
    e.preventDefault();
    let prompt = textarea.current.value;
    
    textQuery(prompt);
  };

  const handleSubmitStop = () => {
    
  }


  /**
   * 
   * @returns 
   */
  const generateUniqueId = () => {  //uniqueId 생성
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

  //응답 메시지 stream(한글자 씩 출력)
  const streamText = (element, text) => {
    let index = 0;
      
    let interval = setInterval( () => {
        if(index < text.length){
            element.innerHTML += text.charAt(index);
            index ++;
        }else{
            clearInterval(interval);
        }
    }, 20);
  }
  

  useEffect( () => {
    // setIsProceeding(true);  //첫화면 버튼 ui세팅
  });


  return (
    <div className="flex h-full min-h-screen">
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
            <select ref={botType} title='gpts' className='absolute right-10 top-5 border rounded-lg p-2'>
              <option value="normal">ChatGPT 4</option>
              <option value="englishChatBot">English Chat Bot</option>
            </select>
            
            <div className="text-md mt-16 pb-28">
                {/* <div className='text-lg'>
                      <div className='mt-5'>
                        <div className="profile flex items-center">
                              <img src={bot} alt='bot' /> <span className='ml-3 text-xl'>Bot</span>
                          </div>
                          <div className="whitespace-pre-wrap mt-2 ml-8">{''.replace(/\+/g, '\n')}</div>
                      </div>
                      <div className='mt-5 message user'>
                          <div className="profile flex items-center">
                              <img src={user} alt='user' /> <span className='ml-3 text-xl'>You</span>
                          </div>
                          <div className="whitespace-pre-wrap mt-2 ml-8">{'msg.prompt'}</div>
                      </div>
                  <div className='ml-8'>{loadingText}</div>
                </div> */}
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
            </div>
        </div>
        <div className='flex'>
          <div className="fixed right-0 bottom-0 w-10/12 bg-gray-100 p-4">
              <div className="flex justify-between items-center mx-auto" style={{ maxWidth: '90%' }}>
                  <textarea type="text" id="prompt" placeholder="Message ChatGPT..." rows={1} ref={textarea} onChange={handleResizeHeight} className="p-2 w-full border rounded-lg" />
                      <button  type="button" className='ml-4' onClick={handleSubmitStop}>
                      <svg className="cursor-pointer" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="12" fill="#FF0000"/>
                          <rect x="8" y="8" width="8" height="8" fill="white"/>
                      </svg>
                    </button>
                    <button type="button" className={`ml-4 ${isInputText ? "bg-blue-500" : "cursor-not-allowed bg-gray-300" } text-white px-4 py-2 rounded-lg`} disabled={!isInputText} onClick={handleSendPrompt}>Send</button>
              </div>
          </div>
        </div>

    </div>
  );
};

export default Home;
