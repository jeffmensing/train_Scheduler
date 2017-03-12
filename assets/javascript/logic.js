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
var convertFirstTrainTime = "";
var difference = "";
var remainder = "";
var minTillNextTrain = "";
var nextTrain = "";

$(document).ready(function() {

    $("#add-train").on("click", function() {
        event.preventDefault();
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = $("#first-train-time-input").val().trim();
        frequency = $("#frequency-input").val().trim();
        console.log(name);
        console.log(destination);
        convertFirstTrainTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        currentTime = moment();
        difference = moment().diff(moment(convertFirstTrainTime, "minutes"));
        remainder = difference % frequency;
        minTillNextTrain = frequency - remainder;
        nextTrain = moment().add(minTillNextTrain, "minutes");
        console.log(nextTrain);
        nextTrain = moment(nextTrain).format("hh:mm");
        console.log(nextTrain);
        //for testing firebase connection
        firebase.database().ref().push({
            name: name,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            nextTrain: nextTrain
        })


        //convert first train time

        //get current time 
        //currentTime = moment();
        //find the difference between first and current
        //derive next train time
        //derive minutes untill next train

        //push data to firebase

        //display information to page
    });

    firebase.database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().frequency)



        $(".train-schedule").append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" + "<td class ='col-xs-3'>" + childSnapshot.val().name + "</td>" +
            "<td class ='col-xs-2'>" + childSnapshot.val().destination + "</td>" +
            "<td class ='col-xs-2'>" + childSnapshot.val().frequency + "</td>" +
            "<td class ='col-xs-2'>" + childSnapshot.val().nextTrain + "</td>" +
            "<td class ='col-xs-2'>" + childSnapshot.val().minTillNextTrain + "</td>");

    });





});
