var config = {
    apiKey: "AIzaSyAFFDzXm21dERY5f7kapq2p563asPehXQ4",
    authDomain: "train-cd7ee.firebaseapp.com",
    databaseURL: "https://train-cd7ee.firebaseio.com",
    projectId: "train-cd7ee",
    storageBucket: "train-cd7ee.appspot.com",
    messagingSenderId: "40376837946"
    };
    firebase.initializeApp(config);
    
    // Create a variable to reference the database.
    var dataRef = firebase.database();
    
        // Initial Values
        var name = "";
        var destination = "";
        var startTime = "";
        var frequency = 0;
    
        // Capture Button Click
        document.querySelector("#submit").addEventListener("click", function(event) {
          event.preventDefault();
    
          // Grabbed values from text boxes
          name = document.querySelector("#trainName").value.trim();
          destination = document.querySelector("#destination").value.trim();
          startTime = document.querySelector("#time").value.trim();
          frequency = document.querySelector("#frequency").value.trim();

          // //session storage
          // sessionStorage.setItem("Name", name);
          // sessionStorage.setItem("Destination", destination);
          // sessionStorage.setItem("Time",Tstarttime);
          // sessionStorage.setItem("Frequency", frequency);
    
          // Code for handling the push
          dataRef.ref().push({
            name: name,
            destination: destination,
            frequency: frequency,
            startTime:startTime,
            timeAdded: firebase.database.ServerValue.TIMESTAMP
          });
    
        });
    
        // Firebase watcher .on("child_added"
        dataRef.ref().on("child_added", function(childSnapshot) {

          var startTime = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
          var timeDif = moment().diff(moment(startTime), "minutes");
          var timeLeft = timeDif % childSnapshot.val().frequency;
          var minUntilArrival = childSnapshot.val().frequency - timeLeft;
          var nextTrain = moment().add(minUntilArrival, "minutes");

                
            let parent = document.querySelector("#currTrain");
            let tableRow = document.createElement("tr");
            let nameEl = document.createElement("td");
            nameEl.innerText = childSnapshot.val().name;
            tableRow.appendChild(nameEl);
            let destinationEl = document.createElement("td");
            destinationEl.innerText = childSnapshot.val().destination;
            tableRow.appendChild(destinationEl);
            let frequencyEl = document.createElement("td");
            frequencyEl.innerText = childSnapshot.val().frequency;
            tableRow.appendChild(frequencyEl);
            let nextArrivalEl= document.createElement("td");
            nextArrivalEl.innerText = moment(nextTrain).format("LT");
            tableRow.appendChild(nextArrivalEl)
            let minUntilArrivalEl = document.createElement("td");
            minUntilArrivalEl.innerText = minUntilArrival;
            tableRow.appendChild(minUntilArrivalEl)
            parent.appendChild(tableRow); 
          console.log(moment(nextTrain).format("LT"));
          console.log(minUntilArrival);          
          
          
    
          // Handle the errors
        }, function(errorObject) {
          console.log(`Errors handled: ${errorObject.code}`);
        });
    