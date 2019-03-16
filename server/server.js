const express = require('express');
const bodyParser = require('body-parser');

// get an instance of express
const app = express();

// Use the public directory we made for static files
app.use(express.static('server/public') );

// Parse our request bodies body-parser!
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json() );

//Arry of stuff to send back
let answerArray = [];

//we can get things that are NOT in a file
// req = request     res = response
// this will send back all the cats
app.get('/answer', function(req, res) {
    console.log(`in answers`);
    // good servers always respond!!!
    res.send({
        answer: answerArray
    });
})

app.post('/answer', function(req, res) {
    let pull = req.body;
    if( pull.symbol == '+'){
        pull.answer =addition(pull.inputOne, pull.inputTwo)
    } else if( pull.symbol == '-'){
        pull.answer =subtraction(pull.inputOne, pull.inputTwo)
    } else if( pull.symbol == '*'){
        pull.answer =multiply(pull.inputOne, pull.inputTwo)
    } else if( pull.symbol == '/'){
        pull.answer =divide(pull.inputOne, pull.inputTwo)
    }
    answerArray.push(pull);
    res.sendStatus(201);
})


// this starts our server listening for requests from the vlient on the port 5000
const port = 5000;
app.listen(port, function() {
    console.log('listening on port', port);
})


function addition(num1, num2){
    let answer = Number(num1) + Number(num2)
    return Number(answer)
}

function subtraction(num1, num2){
    let answer = Number(num1) - Number(num2)
    return Number(answer)
}

function multiply(num1, num2){
    let answer = Number(num1) * Number(num2)
    return Number(answer)
}

function divide(num1, num2){
    let answer = Number(num1) / Number(num2)
    return Number(answer)
}