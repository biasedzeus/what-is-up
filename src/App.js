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
import HomePage from "./Pages/HomePage";

// Initialize Firebase

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <HomePage /> : <SignIn />}

    </div>
  );
}

export default App;
