import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
import { getStorage, getDownloadURL, uploadBytesResumable, ref as sRef } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";

const app = initializeApp({
  apiKey: "AIzaSyDXWSTTKUoUZFffRMP4vQLf5uwVvKaOiYw",
  authDomain: "js-webfest.firebaseapp.com",
  projectId: "js-webfest",
  databaseURL: "https://js-webfest-default-rtdb.firebaseio.com",
  storageBucket: "js-webfest.appspot.com",
  messagingSenderId: "413102625971",
  appId: "1:413102625971:web:3aade7cd1e9a9190c58cc6"
});
const auth = getAuth();
const db = getDatabase(app);



onAuthStateChanged(auth, (user) => {
  if (!user) {

    // If user not exist
    window.location.href = "404.html";
  }
  else {
    // If user exists ,

    var btn = document.getElementById('btn');
    btn.addEventListener('click', (e) => {

      e.preventDefault()
      var title = document.getElementById('title').value
      var description = document.getElementById('description').value
      var link = document.getElementById('link').value;
      var imgFile = document.getElementById('imgFile').files[0];

      var data = {
        Title: title,
        Description: description,
        Link: link,
        imgFile: null
      }

      if (title === '' || description === '' || link === '') {
        swal("Oops!", `Empty Fields Not Allowed`, "warning");
      }
      else {
        // console.log(imgFile.name)
        const storage = getStorage(app);
        const storageRef = sRef(storage, 'images/' + imgFile.name);
        // console.log(imgFile)
        const uploadTask = uploadBytesResumable(storageRef, imgFile);

        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          // swal("GOOD!", "Upload is: " + progress + "% done");  
        },
          (error) => {
            swal('Oops!', error, 'error')
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              data.imgFile = downloadURL;
              // console.log(data);
              const postListRef = ref(db, 'Data/');
              const newPostRef = push(postListRef);
              set(newPostRef, data);

              window.location.reload();

            });
          });
      }
    })

    
    const dbRef = ref(db, 'Data/');
   onValue(dbRef, (snapshot) => {


      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        // console.log(childData);
        var generateHtml = `
        <div class="card" style="width: 18rem; margin-left:8px; margin-bottom:8px;">
        <img style="width:100px; border-radius: 50%; height:100px; text-align: center;" src="${childData.imgFile}" class="rounded-circle" id="imageRef" alt="...">
        <div class="card-body">
        <h5 class="card-title" style="font-weight: bold;">${childData.Title}</h5>
        <p class="card-text">${childData.Description}</p>
        </div>
        <div class="card-body">
        <a href="${childData.Link}" class="card-link" target="_blank">Check It Out Here</a>
        </div>
        </div>`



        document.getElementById('myContent').innerHTML += generateHtml;

      });
    }, {
      onlyOnce: true
    });

  
}

});

var portal = document.getElementById('pf').addEventListener('click',function(e){

  window.location.href = './Portfolio/index.html'

});

var btnLogout = document.getElementById('logout').addEventListener('click', function (e) {
  auth.signOut().then(function () {
    // console.log('Signed Out');
    window.location.href = 'index.html'
  }, function (error) {
    console.error('Sign Out Error', error);
  });
});
































