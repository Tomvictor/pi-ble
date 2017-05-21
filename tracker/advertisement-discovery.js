var noble = require('noble');
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://technoripio.cloudapp.net:8883')

var count = 0 ;
var boolFlag = 1 ;

var mainObject = {};// empty Object
var arrayCount = 0 ;
//mainObject[arrayCount] = peripheralId; 

//arrayCount++ ;



noble.on('discover', function(peripheral) {
  console.log('found a device');
  console.log('peripheral discovered (' + peripheral.id +
              ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
              ' connectable ' + peripheral.connectable + ',' +
              ' RSSI ' + peripheral.rssi + ':');
  console.log('\thello my local name is:');
  console.log('\t\t' + peripheral.advertisement.localName);
  console.log('\tcan I interest you in any of the following advertised services:');
  console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));

    if(peripheral.id == 'cc78ab87b181')
    {
	console.log('kranioz ble found');
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
    client.publish('pi', 'Timer Event '+count);

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
	    if(obj == 'cc78ab87b181')
	    {
		console.log('kranioz ble found int the scan results, timer');
		myBleCount++ ;
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
}, 10000);
