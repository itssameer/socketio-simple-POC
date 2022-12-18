import './App.css';

import { useState, useEffect } from 'react';
import { io } from "socket.io-client";

import { nanoid } from 'nanoid';

const socket = io.connect('http://localhost:5000')
const uid = nanoid(4)

function App() {


  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])


  const sendChat = (e) => {
    e.preventDefault()
    socket.emit('chat', { message, uid })

    setMessage('')
  }


  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat((chat) => [...chat, payload])
    })

    return () => {
      socket.off('chat')
    }
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        Chatt app
        <form onSubmit={sendChat}>
          <input type='text' name='chat' placeholder='send text' value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }} />

          <button type='submit'>Send</button>
        </form>

        {chat.map((message, i) => (<div key={i}>{message.message} <span style={{ "backgroundColor": "red", "fontSize": "small" }}>id: {message.uid}</span></div>))}
      </header>
    </div>
  );
}

export default App;
