import "./App.css";
import React, { useState, useEffect } from "react";

//Firbase Imports
import { auth } from "./firebase";

//React Firebas Hooks
import { useAuthState } from "react-firebase-hooks/auth";

//React Router Dom
import { Routes, Route, Link } from "react-router-dom";

//Components
import { SignIn } from "./Components/SignIn";
import HomePage from "./Components/HomePage";

// Initialize Firebase

function App() {
  const [mainUser, setMainUser] = useState(null);
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <HomePage /> : <SignIn />}

      <h1>{user ? user.email : "nouser"}</h1>
      {/* {console.log("Main User", mainUser)} */}
    </div>
  );
}

export default App;
