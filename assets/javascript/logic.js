//Initialize Firebase

var config = {
    apiKey: "AIzaSyB7XxKAN6MBnQoD_Byl-tkWjMdrgEoip1Q",
    authDomain: "trainscheduler-adf59.firebaseapp.com",
    databaseURL: "https://trainscheduler-adf59.firebaseio.com",
    storageBucket: "trainscheduler-adf59.appspot.com",
    messagingSenderId: "660389315770",
};
firebase.initializeApp(config);
var name = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
var currentTime = "";


$(document).ready(function() {

    $("#add-train").on("click", function() {
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = $("#first-train-time-input").val().trim();
        frequency = $("#frequency-input").val().trim();
        console.log(name);
        console.log(destination);

        //for testing firebase connection
        firebase.database().ref().set({
            name: name,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        })


        //convert first train time

        //get current time 
        //currentTime = moment();
        //find the difference between first and current
        //derive next train time
        //derive minutes untill next train

        //push data to firebase

        //display information to page
    })




});
