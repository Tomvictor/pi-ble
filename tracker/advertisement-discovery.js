var noble = require('noble');
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://technoripio.cloudapp.net:8883')


noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

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
}); 

var count = 0 ;
var boolFlag = 1 ;

setInterval(function(){
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
    }
    count++ ;
}, 10000);
