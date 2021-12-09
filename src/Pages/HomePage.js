import React, { useState, useEffect } from "react";
import LogOut from "../Components/LogOut";
import { auth, database } from "../firebase";
import {
  set,
  ref,
  onValue,
  get,
  child,
  push,
  serverTimestamp,
  orderByChild,
  query,
  limitToLast,
  update
} from "firebase/database";
import ContactList from "../Components/ContactList";
import Chats from "../Components/Chats";

const HomePage = () => {
  const currentUser = auth.currentUser;
  const [contactList, setContactList] = useState([]);
  const [selectedUser, SetSelectedUser] = useState([]);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const[lastMsgUserId,setLastMsgUserId] = useState('')

  function handleUserSelect(user) {
    console.log("slectedUser", user);

    SetSelectedUser(user);

    const selectedUserId = user.uid;
    const loggedInUserId = currentUser.uid;

    const primaryKey =  loggedInUserId > selectedUserId
    ? `${loggedInUserId + selectedUserId}`
    : `${selectedUserId + loggedInUserId}`;
    
    const MsgRefQuery = query(ref(database, 'messages/' + primaryKey)
                        ,orderByChild("createdAt") ,limitToLast(50));

    onValue(MsgRefQuery, (qSnapshot) =>{
      let msges =[];
      qSnapshot.forEach((msg) => {
        msges.push(msg.val())
      });
      setMessages(msges);

    })
    const lastMsgRef =  ref(database,'lastMessage/' + primaryKey)
     get(lastMsgRef).then(
      (snapshot) =>{
        setLastMsgUserId(snapshot.val().from)
      }
    )
    if(lastMsgUserId !== currentUser.uid){
       update(lastMsgRef,{
        unread:false
      })
    }




  }



  useEffect(() => {
    const unsubscribe = onValue(
      ref(database, "/users/"),
      (snapshot) => {
        const username = snapshot.val();
        setContactList(username);
      }
      // {
      //   onlyOnce: true,
      // }
    );
    return () => unsubscribe();
  }, [currentUser]);



  async function handleSendMessage() {
    const loggedInUserId = currentUser.uid;
    const selectedUserId = selectedUser.uid;
    const primaryKey =
      loggedInUserId > selectedUserId
        ? `${loggedInUserId + selectedUserId}`
        : `${selectedUserId + loggedInUserId}`;

    const postListRef = ref(database, "messages/" + primaryKey);
    const newPostRef = push(postListRef);
    await set(newPostRef, {
      textMsg: text,
      from: loggedInUserId,
      to: selectedUserId,
      createdAt: serverTimestamp(),
      unseen:true
    })
    setText('');

   const lastMsgRef =  ref(database,'lastMessage/' + primaryKey)
   await set(lastMsgRef,{
    textMsg: text,
    from: loggedInUserId,
    to: selectedUserId,
    unread:true,
   })

   


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
          <ContactList
            contactList={contactList}
            handleUserSelect={handleUserSelect}
            selectedUser={selectedUser}
          />
        </div>
        <div class="right">
          <Chats
            selectedUser={selectedUser}
            handleSendMessage={handleSendMessage}
            text={text}
            setText={setText}
            messages={messages}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
