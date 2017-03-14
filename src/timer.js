// Blinking interval in usec
var configTimeout = 4000;

var mqtt = require('mqtt');
var options = {
    port: 8883
};
var client = mqtt.connect('mqtt://technoripio.cloudapp.net', options);


client.on('connect', function () {
    client.subscribe('tracker')
    client.publish('log/beacon', 'testing timer on pi')
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

var mqfn = function(msg){
    client.publish('log/beacon','Pi counter : '+msg);
};

var counti = 1;

setInterval(function() {
    //isLedOn = !isLedOn;
    counti++;
    console.log("timer event");
    mqfn(counti);
}, configTimeout);

