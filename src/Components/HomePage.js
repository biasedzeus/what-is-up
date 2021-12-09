import React, { useState, useEffect } from "react";
import LogOut from "./LogOut";
import { auth, database } from "../firebase";
import { set, ref, onValue, get, child, push } from "firebase/database";
import Contacts from "./Contacts";
import ContactList from "./ContactList";

const HomePage = () => {
  const [messages, setMessages] = useState([]);

  const dbRef = ref(database);
  get(child(dbRef, `messages/one/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("message-data", snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  //   get(child(dbRef, "Chats/"))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log("message-data", snapshot.val());
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  function sendMessage(name, seen, message) {
    const msgRef = ref(database, "messages/");
    const newMsg = push(msgRef);
    set(newMsg, {
      message: message,
      name: name,
      seen: seen,
      timeStamp: new Date(),
    });
  }

  // useEffect(() => {
  //     onValue(dbRef,(snapshot) =>{
  //     const data = snapshot.val();
  //     setMessages(data)
  // })

  // }, [])

  return (
    <div style={{ backgroundColor: "yellow", width: "100vw", height: "100vh" }}>
      <div className="flex logout">
        <h2>
          welcome back <span>{`@${auth.currentUser.displayName}`}</span>{" "}
        </h2>
        <div>
        <LogOut />
          
        </div>
      </div>

      <div className="flex">
        <div class="left">
          <ContactList />
        </div>
        <div class="right">
          <h1>Chats</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
