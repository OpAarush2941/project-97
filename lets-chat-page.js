var firebaseConfig = {
    apiKey: "AIzaSyDD6sco4vNBnBZZdQB8K-yDe4FJWchUcLE",
    authDomain: "project-95-e7d43.firebaseapp.com",
    databaseURL: "https://project-95-e7d43-default-rtdb.firebaseio.com",
    projectId: "project-95-e7d43",
    storageBucket: "project-95-e7d43.appspot.com",
    messagingSenderId: "963540466757",
    appId: "1:963540466757:web:27f9a2c14ab9f0d568372c"
  };
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name"); 

  function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
    Room_names = childKey;
   console.log("room_name "+Room_names);
   row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
   document.getElementById("output").innerHTML += row;
   });});}
getData();

function redirectToRoomName(room_name){
console.log("room_name");
localStorage.setItem("room_name",room_name);
window.location = "lets_chat_room.html"
}

function add_room(){
  room_name = document.getElementById("room_name").value;
  localStorage.setItem("room_name",room_name);
  firebase.database().ref("/").child(room_name).update({ });
  window.location = "lets_chat_room.html"

}

function logout(){
  localStorage.removeItem("user_name",user_name);
  window.location = "index.html"
}
