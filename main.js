Tail = require('tail').Tail;
var parser = require("./parser.js");
var redis = require("redis");



// REDIS
//------

// setup redis connection
var client = redis.createClient();

client.on('connect', function() {
    console.log('Connected to Redis');
});



function clientJoined(action) {
    // save data to redis (if the client isn't already present)
    console.log("Client " + action.name + " with id " + action.id + " just joined");

    // only valid guids are saved/worth saving
    if (action.guid > 0) {
        // save guid and name to redis
        client.set(action.guid, action.name);

//         client.keys('*', function (err, keys) {
//             if (err) {
//                 return console.log(err);
//             }
//
//             for(var i = 0, len = keys.length; i < len; i++) {
//                 console.log("key -> " + keys[i]);
//             }
//         });

        // notify the collector
        // TODO prepare json message and send via TCP socket
    }
};

function clientKill(action) {
    console.log(action.killerName + " killed -> " + action.victimName);

    if (action.headShot) {
        console.log("H-H-H-HEADSHOT!");
    }

    // don't send data if invalid
    if (action.killerGuid != 0) {
        // TODO send to collector
    }
};

function parseNewContent(data) {
    console.log("[Parse new content] - " + data);

    // kill
    // 776:47 K;185269;7;allies;^2|OCG|^1UnDead;186276;8;axis;^2|OCG|^9CerealKilla;mp40_mp;135;MOD_HEAD_SHOT;head

    // join
    // 592:07 J;185269;5;^2|OCG|^1UnDead

    var parsedObj = parser.parse(data);

    if (parsedObj.type == 'J') {
        clientJoined(parsedObj);
    } else if (parsedObj.type == 'K') {
        clientKill(parsedObj);
    }/* else if (parsedObj.type == 'D') {
        clientDeath(parsedObj);
    } else if (parsedObj.type == 'Q') {
        clientQuit(parsedObj);
    }*/
};




// TODO pass log file via env
var tail = new Tail("game.log");

/** for the startup we go straight to the end of the file and read new data */
tail.on("line", (data) => {
    parseNewContent(data);
});

tail.on("error", function(error) {
    console.log('ERROR: ', error);
});
