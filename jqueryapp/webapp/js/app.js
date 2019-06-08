const config = {
    apiKey: "AIzaSyBH9Y2gpZLxYZqu7Ptzn3jUV6bxPe1fx1s",
    authDomain: "evital-d064b.firebaseapp.com",
    databaseURL: "https://evital-d064b.firebaseio.com",
    projectId: "evital-d064b",
    storageBucket: "evital-d064b.appspot.com",
    messagingSenderId: "102488917505",
    appId: "1:102488917505:web:685af3fb04c5dfaa"
  };
  
  questions = {
    "biker": [{question: "pregunta1", answer: true},{question: "pregunta2",answer: true},{question: "pregunta3",answer: true}],
    "pedestrian": [{question: "pregunta1", answer: true},{question: "pregunta2",answer: true},{question: "pregunta3",answer: true}],
    "driver": [{question: "pregunta1", answer: true},{question: "pregunta2",answer: true},{question: "pregunta3",answer: true}]
  }
  firebase.initializeApp(config);
  var db = firebase.firestore();
$(document).ready(function(){
  db.collection("people").doc("hMHxSx7DzLgqKl6Mft4wNt7JXwG3").get().then((querySnapshot) => {
    user = querySnapshot.data()
    $("#name").text(user.name)
    $("#score").text(user.score)
    $("#rate").text(user.rating)
    
  })
})

