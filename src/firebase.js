// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";


 const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_CODE,
    authDomain: "what-is-up-efc28.firebaseapp.com",
    projectId: "what-is-up-efc28",
    storageBucket: "what-is-up-efc28.appspot.com",
    messagingSenderId: "526613905936",
    appId: "1:526613905936:web:b13770def411f7f9df8095",
    measurementId: "${config.measurementId}",
    databaseURL:process.env.REACT_APP_DB
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();
  




export {database,auth}