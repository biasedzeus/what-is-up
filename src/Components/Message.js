import React,{useRef,useEffect} from 'react';
import Moment from 'react-moment';
import { auth } from '../firebase';
import {TiTick} from 'react-icons/ti';
import { IconContext } from 'react-icons';

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
        <span>
        <IconContext.Provider value={{ className: 'react-icons' }}>
        <TiTick/>
        </IconContext.Provider>
        </span>
      </div>
    );
}

export default Message;
