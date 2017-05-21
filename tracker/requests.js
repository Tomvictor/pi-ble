var request = require('request');
var url = 'http://kranioz.com' ;
var tet = 'http://kranioz.com/ble?range=1';
request(tet, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});
