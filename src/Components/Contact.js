import React from 'react';
import {RiRadioButtonLine} from 'react-icons/ri'
import { IconContext } from "react-icons";

const Contact = ({handleUserSelect,user,id}) => {
  return (
    <div onClick={() =>handleUserSelect(user)}  className="contact-item-holder">
            <h4>{user.username}</h4>
            <span>{user.isOnline 
            ? 
            <IconContext.Provider value={{color:'green',size:'1.2rem'}}><RiRadioButtonLine/></IconContext.Provider>
            :<IconContext.Provider value={{color:'gray',size:'1.2rem'}}><RiRadioButtonLine/></IconContext.Provider>
            }</span>
           
          </div>
  )
}

export default Contact
