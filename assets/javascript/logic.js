//Initialize Firebase

var config = {
    apiKey: "AIzaSyB7XxKAN6MBnQoD_Byl-tkWjMdrgEoip1Q",
    authDomain: "trainscheduler-adf59.firebaseapp.com",
    databaseURL: "https://trainscheduler-adf59.firebaseio.com",
    storageBucket: "trainscheduler-adf59.appspot.com",
    messagingSenderId: "660389315770",
};
firebase.initializeApp(config);
var trainName = "";
var trainDestination = "";
var firstTrainTime = "";
var frequency = "";
var currentTime = "";
var convertFirstTrainTime = "";
var difference = "";
var remainder = "";
var minTillNextTrain = "";
var nextTrain = "";
var database = firebase.database();

//$(document).ready(function() {

$("#add-train").on("click", function() {
    event.preventDefault();
    //Get User Input
    trainName = $("#name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-train-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    console.log("on Click: " + trainName);
    console.log("on Click: " + trainDestination);
    console.log("on Click: " + firstTrainTime);
    console.log("on Click: " + frequency);
    convertFirstTrainTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log("convertedFirstTrainTme: " + convertFirstTrainTime);
    currentTime = moment();
    console.log("currentTime: " + currentTime);
    difference = moment().diff(moment(convertFirstTrainTime, "minutes"));
    console.log("difference: " + difference);
    remainder = difference % frequency;
    console.log("remainder: " + remainder);
    minTillNextTrain = frequency - remainder;
    console.log("minTillNextTrain: " + minTillNextTrain)
    nextTrain = moment().add(minTillNextTrain, "minutes");
    console.log("on Click nextTrain: " + nextTrain);
    nextTrain = moment(nextTrain).format("hh:mm");
    console.log("on Click: nextTrain formated " + nextTrain);
    firebase.database().ref().push({
        name: trainName,
        destination: trainDestination,
        firstTrainTime: firstTrainTime,frequency: frequency,

        nextTrain: nextTrain
    })

    return false;

    //convert first train time

    //get current time 
    //currentTime = moment();
    //find the difference between first and current
    //derive next train time
    //derive minutes untill next train

    //push data to firebase

    //display information to page
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //        $(".train-schedule").append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" + "<td class ='col-xs-3'>" + childSnapshot.val().name + "</td>" +
    $(".train-schedule").append("<tr class='table-row'><td class ='col-xs-3'>" + childSnapshot.val().name + "</td>" +
        "<td class ='col-xs-3'>" + childSnapshot.val().destination + "</td>" +
        "<td class ='col-xs-2'>" + childSnapshot.val().frequency + "</td>" +
        "<td class ='col-xs-2'>" + childSnapshot.val().nextTrain + "</td>" +
        "<td class ='col-xs-2'>" + minTillNextTrain + "</td></tr>");

});





// });
