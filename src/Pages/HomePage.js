import React, { useState, useEffect } from "react";
import LogOut from "../Components/LogOut";
import { auth, database } from "../firebase";
import { set, ref, onValue, get, child, push } from "firebase/database";
import ContactList from "../Components/ContactList";
import Chats from "../Components/Chats";

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
          <Chats/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
