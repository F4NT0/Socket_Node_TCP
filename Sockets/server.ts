//Modules
require('typescript-require');
var color = require('cli-color');
var network = require('net');
const PORT = 8124

class Server{
    //Variables
    server;

    //Constructor
    constructor(){
        //Create TCP Server
        this.server = network.createServer(function(connection){
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
        this.server.on('listening',function(){
            console.log(color.green('Listening Port ' + PORT));
        });

        //Catch Error
        this.server.on('error',function(err){
            if(err.code == 'EADDINUSE'){
                console.warn('Address in use,retrying...');
                setTimeout(() => {
                    this.server.close();
                    this.server.listen(PORT);
                },1000);
            }else{
                console.error(err);
            }
        });
    }
};

const teste = new Server();