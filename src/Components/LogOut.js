import React from 'react'
import { auth } from '../firebase'


const LogOut = () => {
    return (
        <div>
            <button onClick={() => auth.signOut()}>
                Log Out
            </button>
            
        </div>
    )
}

export default LogOut;
