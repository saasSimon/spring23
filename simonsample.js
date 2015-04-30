var https = require('https');
var fs = require('fs');
// var quotes = [];
// quotes.push("you do you");
// quotes.push("be yourself");
// quotes.push("you are almost, but not quite, the best");
// quotes.push("so close, but yet, so far");
// quotes.push("just do it!");

// function getRandomQuote() {
//     return quotes[Math.floor(Math.random() * quotes.length)];
// }

var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt')
};

function sayPi() {
    return ("3.14159265359")
}

function respond(theText) {

    theResponse = {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: theText
            },
            card: {
                type: 'Simple',
                title: 'sayPi',
                subtitle: 'by Simon',
                content: theText
            },
            shouldEndSession: 'false'
        }
    }
    return (theResponse);
}


https.createServer(options, function(req, res) {
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            if (jsonString.length > 0)
                console.log(JSON.parse(jsonString));
        });
    }
    myResponse = JSON.stringify(respond(sayPi()));
    res.setHeader('Content-Length', myResponse.length);
    res.writeHead(200);
    res.end(myResponse);
    console.log(myResponse);
}).listen(443); //Put number in the 3000 range for testing and 443 for production
