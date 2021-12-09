import React ,{useState,useEffect}from "react";
import { auth } from "../firebase";

const Contacts = () => {
    const [user,setUser] = useState([]);
  const userFromBE = auth.currentUser;
useEffect(() => {
    if (user !== null) {
        setUser(userFromBE)
    
      console.log("uid", user.uid);
    } else {
      console.log("No users");
    }
}, [])
// 
 console.log('userFromBackend',userFromBE)
  console.log("user State",user)

  return (
    <div>
      <img style={{width:'100%',height:'200px'}} src={user.photoURL} />
    </div>
  );
};

export default Contacts;
