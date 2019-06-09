function randomItem(array){
  var arrayLength = array.length+1;
  if (arrayLength > 0)
  {
    var index = Math.floor(Math.random()*array.length); 
    GAME.index = index
    GAME.question = array[index]
    console.log(GAME)
    return GAME.question;
  }
  return false
  
  
}

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
    "car driver": [{question: "pregunta1", answer: true, weight: 25, name: "Driving at 70km/h cap"},
                   {question: "pregunta2",answer: true, weight: 25,name: "Driving less than 1hr/day"},
                   {question: "pregunta3",answer: true, weight: 25,name: "Not using phone while driving"}]
  }
  firebase.initializeApp(config);
  var db = firebase.firestore();


$(document).ready(function(){
  db.collection("people").doc("hMHxSx7DzLgqKl6Mft4wNt7JXwG3").get().then((querySnapshot) => {
    user = querySnapshot.data()
    $("#name").text(user.name)
    $("#score").text(user.score)
    $("#rate").text(user.rating)
    GAME = {question: "", user: user, count: 100}    
  })
  
  $("#play").on("click",function(e){
      e.preventDefault();
      db.collection("people").doc("hMHxSx7DzLgqKl6Mft4wNt7JXwG3").get().then((querySnapshot) => {
        console.log(querySnapshot.data())
        GAME.user = querySnapshot.data()
        question = randomItem(questions[GAME.user.type])
        $(".modal-body").html(`<p>${question.question}</p>`)
      })  
  })

  $("#true").on("click",function(e){
    if (GAME.question.answer == true){
        console.log(GAME.question.score)
        GAME.user.score = parseInt($("#score").text()) + GAME.question.weight
        $("#score").text(GAME.user.score)
        user = db.collection("people").doc("hMHxSx7DzLgqKl6Mft4wNt7JXwG3")
        user.set(GAME.user) 
        GAME.count -= 1
        user.collection("history").doc(GAME.count + "").set(GAME.question)
      .then(function(docRef) { 
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    } 
    
  })

  $("#false").on("click",function(e){
    if (GAME.question.answer == false){

    }    
  })
  
})

