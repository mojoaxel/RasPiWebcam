/*
 * Simple static Webserver
 *
 * History:
 * 28.03.13 mojoaxel: created file
 * 03.08.14 mojoaxel: small improvements
 */ 
var http = require('http');
var exec = require('child_process').exec;
var connect = require('connect'); 

var intervall = 10; //in seconds
var image = '/home/pi/RasPiWebcam/image.jpg';

function captureImage(){
  exec('raspistill -v -q 40 -w 800 -h 600 -awb horizon -t 3000 -o ' + image, function(error, stdout, stderr) {
    console.log("ERROR: ", stderr);
    console.log("OUTPUT: ", stdout);
  });
  console.log("New image captured...");
}

var timer = setInterval(captureImage, intervall*1000);

var app = connect()
  //.use(connect.logger(':remote-addr - :date - (:user-agent) - :url'))
  .use(connect.static(__dirname))

http.createServer(app).listen(8080);

