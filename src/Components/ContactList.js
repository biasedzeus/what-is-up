import React from "react";
import { auth } from "../firebase";
import Contact from "./Contact";

const ContactList = ({contactList,handleUserSelect}) => {

  //read data first

  return (
    <div>
      <h1>Contact List</h1>
      {Object.entries(contactList).map(([id, user]) => {
        if (auth.currentUser.uid !== user.uid) {
          return (
            <Contact
              key={id}
              id={id}
              user={user}
              handleUserSelect={handleUserSelect}
            />
          );
        }
      })}
    </div>
  );
};

export default ContactList;
