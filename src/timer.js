// Blinking interval in usec
var configTimeout = 4000;

var mqtt = require('mqtt');
var options = {
    port: 8883
};
var client = mqtt.connect('mqtt://technoripio.cloudapp.net', options);


client.on('connect', function () {
    client.subscribe('tracker')
    client.publish('log/beacon', 'Hello mqtt')
})


client.on('message', function (topic, message) {

    console.log("entered  switch, with topic" + topic);
    console.log("message over mqtt:" + message);
    switch (topic) {
    case 'tracker':
	console.log("entered switch case tracker");
	console.log("");
    case 'log/beacon':
	console.log("entered switch case beacon");
	console.log("");
    }

});

console.log("Code started");

setInterval(function() {
    //isLedOn = !isLedOn;
    console.log("timer event");
}, configTimeout);
