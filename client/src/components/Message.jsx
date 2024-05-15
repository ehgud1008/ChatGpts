import React from 'react'
import bot from '../images/bot.svg';
import user from '../images/user.svg';
import {List, Avatar} from 'antd';

const message = (props) => {
    console.log(props);
  const isAi = props.who === 'bot' ? <img src={bot} alt='bot' /> : <img src={user} alt='bot' />
  return (
    <List.Item style={{padding: '1rem', listStyleType: 'none', listStyle: 'none'}} className='flex'>
        <List.Item.Meta 
            avatar={<Avatar icon={isAi} className='mr-3'/>} 
            // title={props.who} 
            // description={props.text}
        />
        <div className='pb-1'>
          <div className='text-lg font-semibold pb-3'>
            {props.who}
          </div>
          <div>
            {props.text}
          </div>
        </div>
    </List.Item>
    // <div className='text-lg'>
    //     <div className='mt-5'>
    //         <div className="profile flex items-center">
    //             <img src={bot} alt='bot' /> <span className='ml-3 text-xl'>Bot</span>
    //         </div>
    //         <div className="whitespace-pre-wrap mt-2 ml-8">{''.replace(/\+/g, '\n')}</div>
    //     </div>
    //     <div className='mt-5 message user'>
    //         <div className="profile flex items-center">
    //             <img src={user} alt='user' /> <span className='ml-3 text-xl'>You</span>
    //         </div>
    //         <div className="whitespace-pre-wrap mt-2 ml-8">{'msg.prompt'}</div>
    //     </div>
    //     <div className='ml-8'>{loadingText}</div>
    // </div>
  )
}

export default message