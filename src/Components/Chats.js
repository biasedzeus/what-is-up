import React, { useState } from 'react'



const Chats = ({selectedUser,handleSendMessage,text,setText}) => {
    
    return (
        <div className="chat-container">
            <div className="msgholder">
                {selectedUser ? 
                !selectedUser.username?<h2 className='new-conv'>Start a new conversation</h2>:
                <h1>{selectedUser.username}</h1>:<h2 className='new-conv'>Start a new conversation</h2>
                
                }
            </div>

            
            <div className="sendmsg-btn">
                    <input
                    onChange={e => setText(e.target.value)}
                    className="msg-input" 
                    type="text"/>
                    
                    <button
                    onClick={() =>handleSendMessage(text)}
                    className="msg-send-btn">Send</button>
            </div>
      </div>
          
    )
}

export default Chats
