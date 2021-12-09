import React, { useState } from 'react'



const Chats = () => {
    const[message,setMessage]  = useState('');

    function handleSendMessage (chatId,sender,reiever,message){

    }

    return (
        <div className="chat-container">
      <div class="msgholder">

      </div>
      <div class="sendmsg-btn"></div>
          <input className="msg-input" type="text"/>
          <button
          onClick={handleSendMessage}
           className="msg-send-btn">Send</button>
        </div>
    )
}

export default Chats
