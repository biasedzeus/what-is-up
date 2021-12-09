import React,{useRef,useEffect} from 'react';
import Moment from 'react-moment';
import { auth } from '../firebase';

const Message = ({msg,i}) => {

    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
        
    }, [msg])

    console.log("msggggg",msg.textMsg)
    return (
      <div
        className={`msg-wrapper ${
          msg.from === auth.currentUser.uid ? "own" : ""
        }`}
        ref={scrollRef}
      >
        <p className={msg.from === auth.currentUser.uid ? "me" : "friend"}>
          {msg.textMsg}
        </p>
        <small>
          <Moment fromNow>{msg.createdAt}</Moment>
        </small>
      </div>
    );
}

export default Message;
