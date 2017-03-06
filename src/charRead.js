var async = require('async');
var noble = require('noble');

//var peripheralIdOrAddress = process.argv[2].toLowerCase();
var peripheralIdOrAddress = "b0:b4:48:d0:b4:03"
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
    console.log('reading started');

        peripheral.discoverServices(['180a'], function(error, services) {
      var LedService = services[0];
      console.log('discovered LedService service');

      LedService.discoverCharacteristics(['2a29'], function(error, characteristics) {
        var LedCharacteristic = characteristics[0];
        console.log('discovered  Led characteristic');

        LedCharacteristic.read(function(error, data) {
          // data is a buffer
          console.log('LedCharacteristic value is: ' + data.toString('utf8'));
        });
      });
    });

    console.log('reading ended');



    peripheral.disconnect(function(error) {
    console.log('disconnected from peripheral: ' + peripheral.uuid);

    });
  });


  }


});
