// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt7olzBcCEUIkQEI-OK0Gqf0NYLFDJpNo",
  authDomain: "task-management-9df92.firebaseapp.com",
  projectId: "task-management-9df92",
  storageBucket: "task-management-9df92.appspot.com",
  messagingSenderId: "1033129705959",
  appId: "1:1033129705959:web:6325f3415fe45ba387fd42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;