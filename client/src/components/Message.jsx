import React from 'react'
import bot from '../images/bot.svg';
import user from '../images/user.svg';

const message = (props) => {
    console.log(props);
  return (
    <div className='text-lg'>
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
    </div>
  )
}

export default message