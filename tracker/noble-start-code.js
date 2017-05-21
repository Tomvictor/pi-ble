noble.on('stateChange', function(state) {
    if (state === 'poweredOn') {
	noble.startScanning();
    } else {
	noble.stopScanning();
    }
});
