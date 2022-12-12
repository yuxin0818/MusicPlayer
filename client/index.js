import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getDatabase, ref, child, push, update, set } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// const music = new Audio("/audio/1.mp3");

// const songs = [
//     {
//         id: 1,
//         songName: `Song 1 <br> 
//         <div class="subtitle">Artists 1</div>`,
//         poster: "img/1.png"
//     },
//     {
//         id: 2,
//         songName: `Song 2 <br> 
//         <div class="subtitle">Artists 1</div>`,
//         poster: "img/2.png"
//     }
// ]

// Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
//     e.getElementsByTagName('img')[0].src = songs[i].poster;
//     e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;

// });

// let masterPlay = document.getElementById('masterPlay');


// masterPlay.addEventListener('click', ()=>{
//     if (music.paused || music.currentTime <= 0) {
//         music.play();
//         // TODO: the button cannot change , should fix this
//         masterPlay.classList.remove("play_btn");
//         masterPlay.classList.add("/img/pause.png");
//     } else {
//         music.pause();
//         //TODO: the button also should change back here
//     }
// })
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDa6SU3OpPfWUxiZZd-4CbqKnnJgTRvXw",
  authDomain: "musicplayer-76a15.firebaseapp.com",
  projectId: "musicplayer-76a15",
  storageBucket: "musicplayer-76a15.appspot.com",
  messagingSenderId: "639039137446",
  appId: "1:639039137446:web:e3106028a2428f27ad7667",
  measurementId: "G-CXNKRV3157"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// initialize variable
const auth = getDatabase(app);
const db = getDatabase(app);

// set up our register function
document.getElementById('Register_btn').addEventListener('click', register);
function register() {
    // get all out input fields
    console.log('register function')
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const full_name = document.getElementById('full_name').value

    // validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert("email or password is invalid");
        return
    } 
    if (!validate_field(full_name)) {
        alert("full_name cannot be empty");
        return
    }
    // move on with auth
    const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    set(ref(db, 'users/' + user.uid), {
        email : email,
        full_name : full_name,
        last_login : Date.now()
    });
    alert('User Created!');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

}
// set up our login function
document.getElementById('Login_btn').addEventListener('click', login);
function login() {
    console.log('login function')
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert("email or password is invalid");
        return
    } 
        // move on with auth
    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // update(ref(db, 'users/' + user.uid), {
    //     last_login : Date.now()
    // });
    const postData = {
        last_login : Date.now()
      };
    
    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'posts')).key;
    
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + user.uid + '/' + newPostKey] = postData;
    
    update(ref(db), updates);

    alert('User Logged In!');

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

}
// check email valid or not
function validate_email(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true;
    } else {
        return false;
    }
}

// check password
function validate_password(password) {
    if (password < 6) {
        return false;
    } else {
        return true;
    }
}

// name cannot be empty
function validate_field(field) {
    if (field == null) {
        return false;
    } else {
        return true;
    }
}


// add adio

