import React from 'react'
import { auth } from '../firebase';
import { database } from '../firebase';
import { update,ref } from '@firebase/database';



const LogOut = () => {
    
    
    
    const currentUser = auth.currentUser;
    
    

    function updateOnlineStatus(userId) {
        update(ref(database, "/users/" + userId), {
          isOnline:false,
        });
      }

  function handleLogout(){
    auth.signOut();
    updateOnlineStatus(currentUser.uid)
    


  }

    return (
        <div>
            <button
            className="logout-button"
             onClick={handleLogout}>
                Log Out
            </button>
            
        </div>
    )
}

export default LogOut;
