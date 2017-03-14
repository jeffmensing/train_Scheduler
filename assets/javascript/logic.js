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
var database = firebase.database();

//$(document).ready(function() {

$("#add-train").on("click", function() {
    event.preventDefault();
    //Get User Input
    trainName = $("#name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    firstTrainTime = moment($("#first-train-time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    frequency = $("#frequency-input").val().trim();

    firebase.database().ref().push({
        name: trainName,
        destination: trainDestination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");


    return false;

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrainTime;

    console.log(firstTrain);
    console.log(tFrequency);

    //Calculate minutes to arrival. Current time (unix) subtract firsTrain time
    //and then find the modulus between the difference and the frequency
    var difference = moment().diff(moment.unix(firstTrain), "minutes");
    console.log(difference);
    var trainRemainder = moment().diff(moment.unix(firstTrain), "minutes") % tFrequency;
    console.log(trainRemainder);
    var trainMinutes = tFrequency - trainRemainder;
    console.log(trainMinutes);
    var trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");
    console.log(trainArrival);

    $(".train-schedule").append("<tr class='table-row'><td class ='col-xs-3'>" + trainName + "</td>" +
        "<td class ='col-xs-3'>" + tDestination + "</td>" +
        "<td class ='col-xs-2'>" + tFrequency + "</td>" +
        "<td class ='col-xs-2'>" + trainArrival + "</td>" +
        "<td class ='col-xs-2'>" + trainMinutes + "</td></tr>");

});





// });
