//Import Modules
require('typescript-require');
var color = require('cli-color');
var network = require('net');
const PORTSERVER = 8124

class Server{
    //Variables
    server;

    //Constructor
    constructor(){
        //Create TCP Server
        this.server = network.createServer(function(connection){
            console.log(color.green("Connected to Server"));
    
            connection.on('data',function(data){    
                console.log(color.blue(data + ' From ' + connection.remoteAddress + ' ' + connection.remotePORTSERVER));
                connection.write('[Repeating File]\n ' + data);
            });
    
            connection.on('close', function(){
                console.log(color.red("Client Closed Connection"));
            });
    
        }).listen(PORTSERVER);

        //Listening to PORTSERVER
        this.server.on('listening',function(){
            console.log(color.green('Listening port ' + PORTSERVER));
        });

        //Catch Error
        this.server.on('error',function(err){
            if(err.code == 'EADDINUSE'){
                console.warn('Address in use,retrying...');
                setTimeout(() => {
                    this.server.close();
                    this.server.listen(PORTSERVER);
                },1000);
            }else{
                console.error(err);
            }
        });
    }
}

// RUNNING SERVER
const server = new Server();