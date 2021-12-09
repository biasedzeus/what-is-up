import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup,} from "@firebase/auth";
import { database } from "../firebase";
import { set, ref, serverTimestamp } from "@firebase/database";

export const SignIn = () => {

  function writeUserData(userId, name, email) {
    set(ref(database, "/users/" + userId), {
      username: name,
      email: email,
      createdAt:serverTimestamp(),
      isOnline:true,
    });
  }

  async function handleSignIn() {
     const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
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
      <button
      className="sign-in btn"
       onClick={handleSignIn}>
         <h1>Sign IN</h1></button>
    </div>
  );
};
