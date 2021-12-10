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
  update,
} from "firebase/database";
import ContactList from "../Components/ContactList";
import Chats from "../Components/Chats";

const HomePage = () => {
  const currentUser = auth.currentUser;

  //STATES
  const [contactList, setContactList] = useState([]);
  const [selectedUser, SetSelectedUser] = useState([]);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const[lastMsgUserId,setLastMsgUserId] = useState('');
  const[lastMsgFromMsges,setLastMsgFromMsges] = useState([])
  
  // USEFFECT
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


  //TO SELECT USER
  async function handleUserSelect(user) {
                  console.log("slectedUser", user);

                  SetSelectedUser(user);


                //Current User Id and selecdUser Id
                  const selectedUserId = user.uid;
                  const loggedInUserId = currentUser.uid;
                

                  //Primary Key Logic
                  const primaryKey =  loggedInUserId > selectedUserId
                  ? `${loggedInUserId + selectedUserId}`
                  : `${selectedUserId + loggedInUserId}`;
                  


                  //QUERY FOR AlL MESSAGES FROM DATABASE/MESSAGES
                  const MsgRefQuery = query(ref(database, 'messages/' + primaryKey)
                                      ,orderByChild("createdAt") ,limitToLast(50));
                

                  //SETTING ALL RETRIEVED MESSAGES TO A STATE : MESSAGES USING ONVALUE()

                  onValue(MsgRefQuery, (qSnapshot) =>{
                    let msges =[];
                    qSnapshot.forEach((msg) => {
                      msges.push(msg.val())
                    });
                    setMessages(msges);

                  })


                  //SETTING LAST MESSAGE REFERENCE
                  const lastMsgRef =  ref(database,'lastMessage/' + primaryKey)
                  

                  //UPDATE LAST MSG  {SEEN:FALSE} STORED IN LASTMESSAGE/PRIMARYKEY

                  //  await get(lastMsgRef, (snapshot) =>{
                  //   // setLastMsgUserId(snapshot.val().from)
                  //   if(snapshot.val().from !== currentUser.uid){
                  //    update(lastMsgRef,{
                  //      unseen:false
                  //    })
                  //  }
                  // // })


                  // await get (lastMsgRef).then((snapshot) =>{
                  //   if(snapshot.exists()){
                  //     if(snapshot.val().from !== currentUser.uid){
                  //       update(lastMsgRef,
                  //         {
                  //           unseen:false
                  //         })
  
                  //       const lastMsgFromMsgesRefQuery = query(ref(database,'messages/'+ primaryKey)  ,limitToLast(1));
                  //       get(lastMsgFromMsgesRefQuery).then((lastSnapshot) =>{
                  //       if(lastSnapshot.val().textMsg.localeCompare(snapshot.val().textMsg)){
                          
                  //         update(lastMsgFromMsgesRefQuery,{
                  //           unseen:false
                  //         })}
                  //       })
                  //     }
                  //     }
                  // }
                  const lastMsgFromMsgesRefQuery = query(ref(database,'messages/'+ primaryKey)  ,limitToLast(1));
                  await get(lastMsgRef).then((snapshot) =>{
                      if(snapshot.exists()){
                       if(snapshot.val().from !== currentUser.uid){
                         update(lastMsgRef,{unseen:false});
                         get(lastMsgFromMsgesRefQuery).then(qsnapshot =>{
                           console.log('qsnapshot',qsnapshot)
                             if (qsnapshot.val().textMsg.localeCompare(snapshot.val().textMsg) == 0){

                              update(lastMsgFromMsgesRefQuery,{unseen:false})
                             }
                         }
                         //qury endig
                          ).catch(error =>{console.log(error)})
                        }//compare userid ending
                      }
                      //if snapshot ending




                  })
                  //ending

               
}
    


  


  async function handleSendMessage() {
    if (text === '') return;
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
    unseen:true,
   })

   


  }

  return (
    <div style={{ backgroundColor: "yellow", width: "100vw", height: "100vh" }}>
      <div className="flex logout">
        <h2>
          welcome back <span>{`@${auth.currentUser.displayName}`}</span>{" "}
        </h2>
        <div>
          {
            console.log("msg-array",messages)

          }
          <LogOut />
        </div>
      </div>

      <div className="flex">
        <div className="left">
          <ContactList
            contactList={contactList}
            handleUserSelect={handleUserSelect}
            selectedUser={selectedUser}
          />
        </div>
        <div className="right">
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
