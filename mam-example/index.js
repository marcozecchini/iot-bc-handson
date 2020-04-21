'use strict'

const MAM_public = require('./lib/attachDataPublic.js')
const MAM_private = require('./lib/attachDataPrivate.js')
const MAM_restricted = require('./lib/attachDataRestricted.js')
const IOTA = require('iota.lib.js')
const iota = new IOTA("https://nodes.comnet.thetangle.org:443")
const mqtt = require ('mqtt');

var client  = mqtt.connect('mqtt://127.0.0.1:1883');
var jsonData = null;

//connect and subscribe to topic

client.on('connect', function () {
  client.subscribe('test');
  console.log('client has subscribed successfully');
});

function getmyjson(myjson){
	jsonData = JSON.parse(myjson);
	console.log(jsonData);
};

// get data
client.on('message', function (topic, message){
	getmyjson(message);
	start();
});

let date,i=1

console.log('\n\nSENDING DATA!!\n\n')

//Create a JSON as message

function start(){
	date = new Date(Date.now()).toLocaleString()
    // ORIGINAL LINE let message = { 'Message' : i, 'Date' : date}
    let message = { 'Message' : i, 'device-id': jsonData.id, 'humidity' : jsonData.data.Humidity, 'pressure' : jsonData.data.Pressure, 'temperature' :jsonData.Temperature };
	switch(process.argv[2]){								//Getting the mode of the stream (Public:1, Private:2, Restricted: 3)
		case '1': MAM_public.attach(message);break;
		case '2': MAM_private.attach(message);break;
		case '3': MAM_restricted.attach(message);break;
		default: MAM_public.attach(message)
	}
	console.log('Start sending data to Tangle...')
	let messageS = JSON.stringify(message)
	console.log('Message: %s',messageS)
	console.log('Message in trytes: ' + iota.utils.toTrytes(messageS))
	console.log('--------------------------------------------------------------------------------------------------------------------')
	i++
}