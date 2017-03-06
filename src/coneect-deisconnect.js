var async = require('async');
var noble = require('noble');

//var peripheralIdOrAddress = process.argv[2].toLowerCase();
var peripheralIdOrAddress = "b0:b4:48:d0:b4:03"
noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});


noble.on('discover', function(peripheral) {

  if (peripheral.id === peripheralIdOrAddress || peripheral.address === peripheralIdOrAddress) {
    noble.stopScanning();


    peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);

    peripheral.disconnect(function(error) {
    console.log('disconnected from peripheral: ' + peripheral.uuid);
    
    });
  });


  }


});
