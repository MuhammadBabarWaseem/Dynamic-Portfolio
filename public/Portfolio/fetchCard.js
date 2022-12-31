import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

const app = initializeApp({
  apiKey: "AIzaSyDXWSTTKUoUZFffRMP4vQLf5uwVvKaOiYw",
  authDomain: "js-webfest.firebaseapp.com",
  projectId: "js-webfest",
  databaseURL: "https://js-webfest-default-rtdb.firebaseio.com/",
  storageBucket: "js-webfest.appspot.com",
  messagingSenderId: "413102625971",
  appId: "1:413102625971:web:3aade7cd1e9a9190c58cc6"
});



const db = getDatabase(app);
const dbRef = ref(db, 'Data/');

onValue(dbRef, (snapshot) => {
            
      snapshot.forEach((childSnapshot) => { 
        
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childData)

        var generateHtml = `
 
                <div class="col-sm-4">
                  <a href="${childData.Link}" class="black-image-project-hover">
                    <img src="${childData.imgFile}" alt="" class="img-responsive">
                  </a>
                  <div class="card-container card-container-lg">
                    <h3>${childData.Title}</h3>
                    <p>${childData.Description}</p>
                    <a href="${childData.Link}" title="" class="btn btn-default" target="_blank">Discover</a>
                  </div>
              
 
            </div>`
            
        document.getElementById('showCard').innerHTML += generateHtml;

      });
    }, {
      onlyOnce: true
    });


  
