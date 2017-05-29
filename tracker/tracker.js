var noble = require('noble');
var mqtt = require('mqtt')
//Request code
var request = require('request');
var baseUrl = 'http://kranioz.com/ble?' ;
//mqtt import
var client  = mqtt.connect('mqtt://technoripio.cloudapp.net:8883')
var myDeviceId = 'b0b448c36707'
var count = 0 ;
var boolFlag = 1 ;

var mainObject = {};// empty Object
var arrayCount = 0 ;
//mainObject[arrayCount] = peripheralId; 

//arrayCount++ ;



noble.on('discover', function(peripheral) {
  console.log('Found a device');
  console.log('peripheral discovered (' + peripheral.id +
              ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
              ' connectable ' + peripheral.connectable + ',' +
              ' RSSI ' + peripheral.rssi + ':');
  console.log('\tlocal name is:');
  console.log('\t\t' + peripheral.advertisement.localName);
  console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));

    if(peripheral.id == myDeviceId)
    {
	console.log('kranioz Ble Device found');
    }
    console.log();
    //storing the current device to json object
    mainObject[arrayCount] = peripheral.id ;
    //incrimenting the object key by once
    arrayCount++ ;
    console.log(mainObject[arrayCount]);
    console.log(arrayCount);
}); 

//timer code starts here
var i=0;
var myBleCount = 0;
setInterval(function(){
    arrayCount = 0 ;
    console.log('Timer event '+count);
    client.publish('idcard', 'Timer Event '+count);

    if(boolFlag == 1)
    {
	boolFlag = 0 ;
	noble.startScanning();
    }
    else
    {
	boolFlag = 1 ;
	noble.stopScanning();
	for (i = 0; i <= arrayCount; i++)
	{
	    var obj = mainObject[i];
	    console.log(obj);
	    if(obj == myDeviceId)
	    {
		console.log('kranioz Ble Device Found in the scan results, In Range');
		client.publish('idrange', 'In Range');
		//baseUrl+= 'range=1' ;
		console.log(baseUrl);
		request(baseUrl+'range=1', function (error, response, body) {
		    console.log('error:', error); // Print the error if one occurred
		    console.log('statusCode:', response && response.statusCode); // Print the response
		    console.log('body:', body); // Print the HTML for the Google homepage.
		});
		myBleCount++ ;
	    }
	    else
	    {
		client.publish('idrange', 'Out of Range');
		console.log('Kranioz Ble Device, Not fount, Out of range');
		//baseUrl += 'range=0' ;
		console.log(baseUrl+'range=0');
		request(baseUrl, function (error, response, body) {
		    console.log('error:', error); // Print the error if one occurred
		    console.log('statusCode:', response && response.statusCode); // Print the response
		    console.log('body:', body); // Print the HTML for the Google homepage.
		});
	    }
	}

	if(myBleCount)
	{
	    //if myBleCount > 0 the device presense, else not out of range
	    console.log('ble found count greater than 0');
	}
	myBleCount = 0 ;
    }
    count++ ;
}, 7000);
