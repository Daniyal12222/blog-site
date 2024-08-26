import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc, addDoc, collection, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"




const firebaseConfig = {
    //YOUR COPIED FIREBASE PART SHOULD BE HERE
    apiKey: "AIzaSyBZAI02pI8CUWyP8YEjEjNv1nXlb8VZ6bc",
    authDomain: "test-43a6f.firebaseapp.com",
    projectId: "test-43a6f",
    storageBucket: "test-43a6f.appspot.com",
    messagingSenderId: "922853907642",
    appId: "1:922853907642:web:1c059ffed834fb1d76b683"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

let d_name = document.getElementById('loggedUserFName');
let d_email = document.getElementById('loggedUserEmail');
let d_lastn = document.getElementById('loggedUserLName');
let d_u = document.getElementById('User');
const logoutButton = document.getElementById('logout');
let u_ui;
let u_name;

// if (loggedInUserId) {
    //     nay()
    // }
    
    onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        // console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    u_ui = user.uid
                    u_name = userData.fullName
                    // document.getElementById('loggedUserFName').innerText=userData.firstName.slice(0,1);
                    // document.getElementById('loggedUserEmail').innerText=userData.email;
                    // document.getElementById('loggedUserLName').innerText=userData.lastName;
                    // d_name.innerText = userData.firstName
                    d_u.style.display = 'block'
                    logoutButton.style.display = 'block'
                   
                    d_u.innerText = userData.fullName.slice(0, 1).toUpperCase();
                    // console.log(user.uid);


                }
                else {
                    console.log("no document found matching id")
                }
            })
            .catch((error) => {
                console.log("Error getting document");
            })
    }
    else {
        console.log("User Id not Found in Local storage")
    }
})

// function nay() {
//     d_u.style.display = 'block'
//                     logoutButton.style.display = 'block'
// }

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            d_u.style.display = 'none'
            logoutButton.style.display = 'none'
            window.location.href = 'creat.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        })
})

// =========================================================== //
let dataa = new Date()

let add_blog = document.getElementById('add_blog');
let blog_box = document.getElementById('box_add');

add_blog.addEventListener('click', async () => {

    let local = localStorage.getItem('loggedInUserId')
    if (!local) {

        window.location.href = 'creat.html'
    }



    const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Message",
        inputPlaceholder: "Type your message here...",
        inputAttributes: {
            "aria-label": "Type your message here"
        },
        showCancelButton: true
    });
    if (text) {
        // Swal.fire(text);
        let blog_text = text;

        // const docRef = await addDoc(collection(db, "data"), {
        //     name : u_ui,
        //     btext: blog_text,
        // });
        // console.log("Document written with ID: ", docRef.id);
        try {
            const docRef = await addDoc(collection(db, "blog"), {
                uid: u_ui,
                btext: blog_text,
                uname: u_name,
                dataA: dataa.toString().slice(0, 15),


            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }



    }
});

setTimeout(async () => {
    blog_box.innerHTML = ''
    const querySnapshot = await getDocs(collection(db, "blog"));
    querySnapshot.forEach((doc) => {
        //   console.log(`${doc.id} => ${doc.data()}`);
        let docdata = doc.data()
        blog_box.innerHTML += ` <div class="box w-[90%]  p-1 bg-gray-400 mt-3 rounded  ">
                <div class="w-full flex flex-col items-start h-full p-4 rounded bg-blue-100 ">
                <h2 class="font-bold mb-2 ">${docdata.uname.slice(0, 1).toUpperCase()}${docdata.uname.slice(1)}:</h2>
                    <p class='ps-7'> ${docdata.btext}</p>
                    <p class='self-end fond-[20px]'>${docdata.dataA}</p>
             <!--   <button id="del"  class="w-[20%] h-[6vh] rounded  bg-gray-700 text-white"> delet </button>   -->
                    </div>
            </div>`
    })

}, 1000)











