import React from 'react'
import bot from '../images/bot.svg';
import user from '../images/user.svg';
import {List, Avatar} from 'antd';

const message = (props) => {
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
  )
}

export default message