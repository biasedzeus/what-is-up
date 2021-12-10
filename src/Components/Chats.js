import React, { useState } from 'react'
import Message from './Message';



const Chats = ({selectedUser,handleSendMessage,text,setText,messages}) => {
    
    return (
        <div className="chat-container">
            <div className="msgholder">
               <div className="selectedUser-name">
               {selectedUser ? 
                !selectedUser.username?<h2 className='new-conv'>Start a new conversation</h2>:
                <h1>{selectedUser.username}</h1>:<h2 className='new-conv'>Start a new conversation</h2>
                
                }
               </div>
               <div className="messages">
                   {messages.length ? messages.map((msg,index) =>{
                       return <Message key={index} msg={msg} i={index}/>

                   }):'No messages'}
                   
               </div>
            </div>

            
            <div className="sendmsg-btn">
                    <input
                    onChange={e => setText(e.target.value)}
                    className="msg-input" 
                    value={text}
                    type="text"/>

                    <button
                    onClick={handleSendMessage}
                    className="msg-send-btn">Send</button>
            </div>
      </div>
          
    )
}

export default Chats;
