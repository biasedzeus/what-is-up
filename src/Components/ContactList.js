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

import Contact from "./Contact";

const ContactList = () => {
  const currentUser = auth.currentUser;
  const [ContactList, setContactList] = useState([]);
  //read data first

  function handleUserSelect(user){
console.log('slectedUser',user)
  }

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
      {Object.entries(ContactList).map(([id, user]) => {
        console.log("id", id);
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
