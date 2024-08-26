 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import { getFirestore, doc,  collection, getDocs, } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

 
 const firebaseConfig = {
 apiKey: "AIzaSyBZAI02pI8CUWyP8YEjEjNv1nXlb8VZ6bc",
    authDomain: "test-43a6f.firebaseapp.com",
    projectId: "test-43a6f",
    storageBucket: "test-43a6f.appspot.com",
    messagingSenderId: "922853907642",
    appId: "1:922853907642:web:1c059ffed834fb1d76b683"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

//  let blog_my = document.getElementById('box_my');

//  setTimeout(async () => {
//     blog_my.innerHTML = ''
//     const querySnapshot = await getDocs(collection(db, "blog"));
//     querySnapshot.forEach((doc) => {
//         //   console.log(`${doc.id} => ${doc.data()}`);
//         let docdata = doc.data()
//         blog_my.innerHTML += ` <div class="box w-[90%]  p-1 bg-gray-400 mt-3 rounded  ">
//                 <div class="w-full flex flex-col items-start h-full p-4 rounded bg-blue-100 ">
//                 <h2 class="font-bold mb-2 ">${docdata.uname.slice(0, 1).toUpperCase()}${docdata.uname.slice(1)}:</h2>
//                     <p class='ps-7'> ${docdata.btext}</p>
//                     <p class='self-end fond-[20px]'>${docdata.dataA}</p>
//              <!--   <button id="del"  class="w-[20%] h-[6vh] rounded  bg-gray-700 text-white"> delet </button>   -->
//                     </div>
//             </div>`
//     })

// }, 1000)
 let blog_my = document.getElementById('box_my');


const querySnapshot = await getDocs(collection(db, "blog"));
querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
let docdata = doc.data()
if (docdata.uid) {
    
    blog_my.innerHTML += ` <div class="box w-[90%]  p-1 bg-gray-400 mt-3 rounded  ">
    <div class="w-full flex flex-col items-start h-full p-4 rounded bg-blue-100 ">
    <h2 class="font-bold mb-2 ">${docdata.uname.slice(0, 1).toUpperCase()}${docdata.uname.slice(1)}:</h2>
    <p class='ps-7'> ${docdata.btext}</p>
    <p class='self-end fond-[20px]'>${docdata.dataA}</p>
    <!--   <button id="del"  class="w-[20%] h-[6vh] rounded  bg-gray-700 text-white"> delet </button>   -->
    </div>
    </div>`
    }

});