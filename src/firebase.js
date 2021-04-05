import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCGeGxYXUdIPWZfzDDjPsZQ_1EfvAvoR_M",
  authDomain: "vue-practice-todo.firebaseapp.com",
  databaseURL: "https://vue-practice-todo-default-rtdb.firebaseio.com",
  projectId: "vue-practice-todo",
  storageBucket: "vue-practice-todo.appspot.com",
  messagingSenderId: "284545529409",
  appId: "1:284545529409:web:6fba5aebefea763bbd78c0",
  measurementId: "G-94YTQ0BGQT"
}

// Initialize Firebase
const firebaseApp= firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebaseApp.firestore()