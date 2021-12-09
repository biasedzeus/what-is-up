import React,{useState,useEffect} from 'react';
import LogOut from './LogOut';
import { database } from '../firebase';
import {ref,onValue} from 'firebase/database'
import Contacts from './Contacts';
import ContactList from './ContactList';

const HomePage = () => {
const [messages,setMessages] = useState([]);
   
const dbRef= ref(database,'users/');
useEffect(() => {
    onValue(dbRef,(snapshot) =>{
    const data = snapshot.val();
    setMessages(data)
})
    
}, [])

console.log("messgage::",messages)

    return (
        <div style={{backgroundColor:'yellow',width:'100vw',height:'100vh'}}>
            <LogOut/>
            HomePage
            <h1>Chats</h1>
            
            

        </div>
    )
}

export default HomePage
