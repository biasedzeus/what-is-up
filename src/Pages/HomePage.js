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
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const currentUser = auth.currentUser;

  //STATES
  const [contactList, setContactList] = useState([]);
  const [selectedUser, SetSelectedUser] = useState([{}]);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([{}]);
  const[lastMsgUserId,setLastMsgUserId] = useState('');
  const[lastMsgFromMsges,setLastMsgFromMsges] = useState([])
  

  console.log("message using length",messages[messages.length-1]);
   useEffect(() => {
      
    
                //Current User Id and selecdUser Id
                const selectedUserId = selectedUser.uid;
                const loggedInUserId = currentUser.uid;
              

                //Primary Key Logic
                const primaryKey =  loggedInUserId > selectedUserId
                ? `${loggedInUserId + selectedUserId}`
                : `${selectedUserId + loggedInUserId}`;
     //SETTING LAST MESSAGE REFERENCE
     const lastMsgRef =  ref(database,'lastMessage/' + primaryKey)

     get(lastMsgRef).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val().from !== currentUser.uid) {
          update(lastMsgRef, { unseen: false });
           
          if (
          // !messages.length == -1 && 
          selectedUser.toUserName && selectedUser.toUserName.localeCompare(messages[messages.length-1]["to"]) === 0  ||
            snapshot
              .val()
              .textMsg
              .localeCompare(messages[messages.length - 1]["textMsg"]) === 0 
              
              ) {
                let lastmsgId = messages[messages.length - 1]["msgId"]
                updateMessageData(primaryKey,lastmsgId)
          }
        } //compare userid ending
      }
      //if snapshot ending
    });
    //ending
     
   }, [selectedUser])

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
                  //         })}
  
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
                  // const rufref =ref(database,'messages/' + primaryKey)
                  // const lastMsgID = get(rufref)

                  // console.log("LAst nASG IDDDD+++",lastMsgID)

                //  get((lastMsgRef, `lastMessage/${primaryKey}`))
                //  .then((s) =>{
                //    console.log("S VALUE",s.val())
                //  } )




                  const lastMsgFromMsgesRefQuery = query(ref(database,'messages/'+ primaryKey),limitToLast(1));
                  const listlastMsgRef =  ref(database,'lastMessage/' + primaryKey)
                console.log("slectdUserUid",user["uid"]);

                //  !messages.length == -1 && 
                

               
}
    console.log("messages,length-1",!messages.length == -1?messages[messages.length-1]["msgId"]:'')

function writeMessageData(primaryKey,text,from ,to,toUserName){
  const uniqueId = uuidv4();
  set(ref(database,`/messages/${primaryKey}/` + uniqueId),{
    textMsg: text,
    from,
    to,
    toUserName,
    createdAt: serverTimestamp(),
    unseen:true,
    msgId:uniqueId,
  })
}

async function updateMessageData(primaryKey,mId){
  
  const updateRef = ref(database,`messages/${primaryKey}/` + mId);
  await update(updateRef,{
    unseen:false,
  })

}
  


  async function handleSendMessage() {
    if (text === '') return;

    const loggedInUserId = currentUser.uid;
    const selectedUserId = selectedUser.uid;
    const primaryKey =
      loggedInUserId > selectedUserId
        ? `${loggedInUserId + selectedUserId}`
        : `${selectedUserId + loggedInUserId}`;



    writeMessageData(primaryKey,text,loggedInUserId,selectedUserId,selectedUser.username)
    
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
