import "./App.css";
import React,{useState,useEffect} from "react";

//Firbase Imports
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//Firebase Database Imports
import { getDatabase,ref, onValue } from "firebase/database";



//React Firebas Hooks
import { useAuthState } from 'react-firebase-hooks/auth';


//React Router Dom
import { Routes, Route, Link } from "react-router-dom";


//Components
import { SignIn } from "./Components/SignIn";
import LogOut from "./Components/LogOut";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function App() {
  const[mainUser,setMainUser]= useState(null);
  const [user,loading,error] = useAuthState(auth);

  



  
  useEffect(() => {
    const deDataRef = ref(database, 'users/');
  onValue(deDataRef, (snapshot) => {
    const data = snapshot.val();
    setMainUser(data)
  });

    
  })




function handleLogOut () {
  auth.signOut();
}




  function handleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User::::>", result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
     {!user? <SignIn handleSignIn={handleSignIn}/>
      : <LogOut handleLogOut={handleLogOut}/>}
     <h1>{user?user.email:'nouser'}</h1>
     {/* <h2>{!null?mainUser.user1.name:'Null'}</h2> */}
     {console.log("Main User",mainUser)}


    </div>
  );
}

export default App;
