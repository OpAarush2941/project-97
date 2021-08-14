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

room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;

        console.log(firebase_message_id);
        console.log(message_data);
        name_data = message_data["name"];
        message = message_data['message'];
        like = message_data["like"];
        name_with_tag = "<h4>" + name_data + "<img src='tick.png' class='user_tick'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message +"</h4>";
        like_with_tag = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>"
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button><hr>"
        row = name_with_tag + message_with_tag + like_with_tag + span_with_tag;
        document.getElementById("output").innerHTML += row;

 } });  }); } 
getData();

function updateLike(message_id){
    console.log("clicked_on_message_id"+message_id);
    likes = document.getElementById(message_id).value;
    updatedLikes = Number(likes) + 1;
    console.log("likes: "+ updatedLikes);
      firebase.database().ref(room_name).child(message_id).update({
            like:updatedLikes
      });
}

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
      message:msg,
      name:user_name,
      like:0
});
    document.getElementById("msg").value = "";
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_name");
    window.location = "index.html"
}