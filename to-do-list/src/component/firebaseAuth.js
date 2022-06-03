import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyB8-i7X-8-IXuzfWHAAuIQS4g9aN3MGFSg",

  authDomain: "to-do-list-a2caf.firebaseapp.com",

  projectId: "to-do-list-a2caf",

  storageBucket: "to-do-list-a2caf.appspot.com",

  messagingSenderId: "412012957166",

  appId: "1:412012957166:web:d8f5751cd89b51feed52ff"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app