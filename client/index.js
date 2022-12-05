// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// export * from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const database = getDatabase(app);


// TODO: Event Handlers doesn't work 
// set up our register function
function register() {
    // get all out input fields
    const email = document.getElementById('email');
    email.addEventListener("click", register, false);
    email.myParam = email.value
    password = document.getElementById('password').addEventListener("click", register, false);
    full_name = document.getElementById('full_name').addEventListener("click", register, false);

    // validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert("email or password is invalid");
        return
    } 
    if (validate_field(full_name) == false) {
        alert("full_name cannot be empty");
        return
    }

    // move on with auth
    auth.createUserWithEmailAndPassword(email, password);
    then(function() {
        var user = auth.currentUser;
        var database_ref = database.ref()
        var user_data = {
            email : email,
            full_name : full_name,
            last_login : Date.now()
        }

        database_ref.child('users/' + user.uid).set(user_data);
        alert('User Created!');

    })
    .catch(function() {
        // firebase will use this to alert error messages
        var error_code = error_code;
        var error_message = error.message;

        alert(error_message);

    })

}

// check email valid or not
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
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
    if (fields == null) {
        return false;
    } else {
        return true;
    }
}
