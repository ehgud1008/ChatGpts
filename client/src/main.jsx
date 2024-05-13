import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //strict 모드는 개발 과정 중에만 적용됨. 배포가 되고나면 strict 모드는 저절로 작동하지 않음.
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
