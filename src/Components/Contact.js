import React from 'react';
import { useState,useEffect } from 'react';
import {RiRadioButtonLine} from 'react-icons/ri'
import { IconContext } from "react-icons";
import { auth,database} from '../firebase';
import { onValue, ref } from 'firebase/database';
import { TiTick } from 'react-icons/ti';

const Contact = ({handleUserSelect,user,id,selectedUser}) => {
  const selectedUserId = user?.uid;
  const loggedInUserId = auth.currentUser.uid;

     const[data,setData] = useState('');
   
     useEffect(() => {
      const selectedUserId = user?.uid;
      const loggedInUserId = auth.currentUser.uid;
 
       const primaryKey =  loggedInUserId > selectedUserId
       ? `${loggedInUserId + selectedUserId}`
       : `${selectedUserId + loggedInUserId}`;
       const lastMsgRef = ref(database,'lastMessage/'+primaryKey)
      const  unsubscribe = onValue(lastMsgRef,(snapshot =>{
        setData(snapshot.val())
      })
        )
     return () => unsubscribe();

     }
     , [])

  return (
    <div
      onClick={() => handleUserSelect(user)}
      className={`contact-item-holder ${
        selectedUser.username === user.username && "selected_user"
      }`}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h4>{user.username}</h4>
        {data?.from !== auth.currentUser.uid && data?.unread && (
          <small className="unread">New</small>
        )}
        <span>
          {user.isOnline ? (
            <IconContext.Provider value={{ color: "green", size: "1.2rem" }}>
              <RiRadioButtonLine />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "gray", size: "1.2rem" }}>
              <RiRadioButtonLine />
            </IconContext.Provider>
          )}
        </span>
      </div>
      {data && (
        <p className="truncate">
          <strong>{data.from === loggedInUserId ? "Me:" : null}</strong>
          {`${data.textMsg}...`}
          <span>
            <IconContext.Provider value={{ className: `react-icons ${data.unread ?'green-tick-icon':''}` }}>
              <TiTick />
            </IconContext.Provider>
          </span>
        </p>
      )}
    </div>
  );
}

export default Contact
