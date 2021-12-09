import React, { useEffect, useState } from "react";
import { database, auth } from "../firebase";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  equalTo,
  onValue,
} from "firebase/database";
import {RiRadioButtonLine} from 'react-icons/ri'
import { IconContext } from "react-icons";

const ContactList = () => {
  const currentUser = auth.currentUser;
  const [ContactList, setContactList] = useState([]);
  //read data first

  useEffect(() => {
    const userId = currentUser.uid;
    onValue(
      ref(database, "/users/"),
      (snapshot) => {
        const username = snapshot.val();
        setContactList(username);
      },
      // {
      //   onlyOnce: true,
      // }
    );
  }, [currentUser]);

  console.log("CONtact List", ContactList);

  return (
    <div>
      <h1>Contact List</h1>
      {Object.entries(ContactList).map(([id, column]) => {
        console.log("id", id);
        if (auth.currentUser.uid !== column.uid) {
          return (
          
          <div class="contact-item-holder">
            <h4>{column.username}</h4>
            <span>{column.isOnline 
            ? 
            
            <IconContext.Provider value={{color:'green',size:'1.2rem'}}><RiRadioButtonLine/></IconContext.Provider>
            :<IconContext.Provider value={{color:'gray',size:'1.2rem'}}><RiRadioButtonLine/></IconContext.Provider>
             
            
            }</span>
           
          </div>  );
        }
      })}
    </div>
  );
};

export default ContactList;
