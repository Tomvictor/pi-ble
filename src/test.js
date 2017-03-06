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

    console.log('peripheral with ID ' + peripheral.id + ' found');
    var advertisement = peripheral.advertisement;

    var localName = advertisement.localName;
    var txPowerLevel = advertisement.txPowerLevel;
    var manufacturerData = advertisement.manufacturerData;
    var serviceData = advertisement.serviceData;
    var serviceUuids = advertisement.serviceUuids;

    peripheral.on('disconnect', function() {
    process.exit(0);
    });

    peripheral.connect(function (err) {
      // body...
      console.log('connected to peripheral: ' + peripheral.uuid);
      console.log();
      console.log('connected to peripheral (ID)' + peripheral.id) ;
      console.log('disconnecting....');


    })
    peripheral.disconnect(function (err) {
      // body...
      console.log('disconnected')
    })

    console.log();
    console.log('disconnected')


  }
});

