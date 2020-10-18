//Import Modules
require('typescript-require');
var color = require('cli-color');
var network = require('net');
const PORTCLIENT = 8124;
var client = new network.Socket();

class Client{
    
    constructor(){
        // utf-8 encoding
        client.setEncoding('utf8');

        // Connect Client
        client.connect(PORTCLIENT, 'localhost', function(){
            console.log(color.yellow("Client connected to Server"));
        });

        // how to send text to Server(getting input)
        process.stdin.on('data',function(data){
            client.write(data);
        });

        //Print text received on Terminal
        client.on('data',function(data){
            console.log(color.blue(data));            
        });

        //When server close 
        client.on('close',function(){
            console.log(color.red('Server connection is closed!'));
        });
    }
}

//FUNCTIONS

//RUNNING CLIENT
const clientRun = new Client();