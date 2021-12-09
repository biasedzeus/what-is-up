import React, { useState } from 'react'



const Chats = ({selectedUser}) => {
    const[message,setMessage]  = useState('');
    console.log('chats',selectedUser)
    
    return (
        <div className="chat-container">
      <div className="msgholder">
          {selectedUser ? 
          !selectedUser.username?<h2 className='new-conv'>Start a new conversation</h2>:
          <h1>{selectedUser.username}</h1>:<h2 className='new-conv'>Start a new conversation</h2>
          
        }
     
      </div>
      <div className="sendmsg-btn">
      <input className="msg-input" type="text"/>
          <button
           className="msg-send-btn">Send</button>
        </div>
      </div>
          
    )
}

export default Chats
