// Blinking interval in usec
var configTimeout = 4000;

console.log("Code started");

setInterval(function() {
    //isLedOn = !isLedOn;
    console.log("timer event");
}, configTimeout);
