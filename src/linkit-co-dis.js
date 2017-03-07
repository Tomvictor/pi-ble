var async = require('async');
var noble = require('noble');

//var peripheralIdOrAddress = process.argv[2].toLowerCase();
var peripheralIdOrAddress = "F7:14:30:42:8E:58"
noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
    console.log('scanning started due to stateChange')
  } else {
    noble.stopScanning();
    console.log('scanning stopped due to state stateChange')
  }
});


noble.on('discover', function(peripheral) {

  console.log('on discover function')
  if (peripheral.id === peripheralIdOrAddress || peripheral.address === peripheralIdOrAddress) {
    noble.stopScanning();
    console.log('scanning stopped, got the required device')


    peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);
    console.log('connected to peripheral (ID): ' + peripheral.address);

    peripheral.disconnect(function(error) {
    console.log('disconnected from peripheral: ' + peripheral.uuid);

    });
  });


  }


});
