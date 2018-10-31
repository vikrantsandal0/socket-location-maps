var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
const randomLocation   = require('random-location');

let port =  2000;

server.listen(port,function(){
    console.log('server has started');
})
app.use(express.static(__dirname));

io.sockets.on('connection',function(socket){

    socket.on('getLocation',()=>{
       var location=[];
        const point = {
            latitude: 51.048615,
            longitude: -114.070847
          }
        const radius = 2000; 
        for(i=0;i<5;i++){
            let randomPoint = randomLocation.randomCircumferencePoint(point, radius);
            location.push(randomPoint);       
        }
        socket.emit('sendLocation',location);    
    });
})