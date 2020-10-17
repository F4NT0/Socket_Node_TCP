// Initialization
require('typescript-require');

//Calling Modules
let color = require('cli-color');
let network = require('net');

//Variables
const PORT = 8124;

//Create Server
let server = network.createServer(function(connection){
    console.log(color.green("Connected to Server"));

    connection.on('data',function(data){
        console.log(color.blue(data + ' From ' + connection.remoteAddress + ' ' + connection.remotePort));
        connection.write('[Repeating File]\n ' + data);
    });

    connection.on('close', function(){
        console.log(color.red("Client Closed Connection"));
    });

}).listen(PORT);

//Listening to PORT
server.on('listening',function(){
    console.log(color.green('Listening Port ' + PORT));
});

//Catch Error
server.on('error',function(err){
    if(err.code == 'EADDINUSE'){
        console.warn('Address in use,retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT);
        },1000);
    }else{
        console.error(err);
    }
});