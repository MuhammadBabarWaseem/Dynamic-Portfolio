
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
   
  const app = initializeApp({
    apiKey: "AIzaSyDXWSTTKUoUZFffRMP4vQLf5uwVvKaOiYw",
    authDomain: "js-webfest.firebaseapp.com",
    projectId: "js-webfest",
    storageBucket: "js-webfest.appspot.com",
    messagingSenderId: "413102625971",
    appId: "1:413102625971:web:3aade7cd1e9a9190c58cc6"
  });

  const auth = getAuth();
    document.getElementById('signIn').addEventListener('click', (e)=>{

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
    //   console.log('Email :' + email + '' + 'Password :' + password);

    
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    //alert(user);
    swal("Hurrah!", "User SignIn SuccessFul!" ,"success"
        ).then(function() {
            window.location.href = "admin.html";
        });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    swal("Oops!", `Email Or Password Doesn't Exist`, "warning");    
  });

})
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     const uid = user.uid;
    
//     console.log(user)
//     // ...
//   } else {
//     console.log('user is signout')
//   }
// });






































