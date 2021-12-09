import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { database } from "../firebase";
import { set, ref } from "@firebase/database";
import { useState } from "react/cjs/react.development";

export const SignIn = ({ handleSignIn }) => {
  const [userId, setUserId] = useState("");

  function writeUserData(userId, name, email) {
    set(ref(database, "/users/" + userId), {
      username: name,
      email: email,
    });
  }

  function handleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        console.log("User::::>", user);
        writeUserData(user.uid, user.displayName, user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <button onClick={handleSignIn}>Sign IN</button>
    </div>
  );
};
