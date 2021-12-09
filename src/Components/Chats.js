import React, { useState } from 'react'



const Chats = ({selectedUser}) => {
    const[message,setMessage]  = useState('');

    
    return (
        <div className="chat-container">
      <div className="msgholder">
          {selectedUser ?
          <div>{selectedUser.name}</div>:
          <h3>Start a conversation</h3>
          
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
