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
  query,  
} from "firebase/database";

import Contact from "./Contact";

const ContactList = () => {
  const currentUser = auth.currentUser;
  const [ContactList, setContactList] = useState([]);
  const[selectedUser,SetSelectedUser] = useState([]);
  //read data first

  function handleUserSelect(user){
console.log('slectedUser',user)
SetSelectedUser(user)
  }
  console.log("selected user state",selectedUser)
  useEffect(() => {
    const userId = currentUser.uid;
   const unsubscribe =  onValue(
      ref(database, "/users/"),
      (snapshot) => {
        const username = snapshot.val();
        setContactList(username);
      },
      // {
      //   onlyOnce: true,
      // }

     
    );
     return(() =>unsubscribe())
  }, [currentUser]);



  


                                                                                          

  return (
    <div>
      <h1>Contact List</h1>
      {Object.entries(ContactList).map(([id, user]) => {
       
        if (auth.currentUser.uid !== user.uid) {
          return (
            <Contact key={id} id={id} user={user}  handleUserSelect={handleUserSelect}/>
          );
        }
      })}
    </div>
  );
};

export default ContactList;
