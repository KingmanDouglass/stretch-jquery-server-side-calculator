console.log('JS');

let symbol = ''

$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    $('#btn-equal').on('click', function(event){
        event.preventDefault();
        addAnswer();
        });
    $('#btn-addition').on('click', function(event){
        event.preventDefault();
        symbol = '+'
        //addtion();
        });
    $('#btn-subtraction').on('click', function(event){
        event.preventDefault();
        symbol = '-'
        //subtraction();
        });
    $('#btn-multiply').on('click', function(event){
        event.preventDefault();
        symbol = '*'
        //multiply();
        });
    $('#btn-division').on('click', function(event){
        event.preventDefault();
        symbol = '/'
        //division();
        });
    getHistory();
    clearInputFields();
    
}

function addAnswer(){
    let newAnswer = {
        inputOne: $('#add-number-one').val(),
        inputTwo: $('#add-number-two').val(),
        symbol: symbol,
    }
    $.ajax({
        method: 'POST',
        url: '/answer',
        data: newAnswer,
    }).then( function( response ) {
        getHistory();
    }).catch( function( error ){
        console.log(`Error adding new answer IN POST ${newAnswer}`, error);
        alert('Sorry! Couldnt add the new cat')
        
    })
}

function getHistory() {
    $.ajax({
            method: 'GET',
            url: '/answer'
        })
        .then( function(response){
        console.log('response', response.answer);
        let answer = response.answer;
        renderAnswer(answer);
        renderHistory(answer)   
    })
    .catch( function(error){
        console.log('Something bad happened', error);
        alert('Something bad happpened IN GET, try back later.');
    })
    console.log('after ajax call');
}

function renderAnswer(answerArray) {
    $('#answer').empty();
        $('#answer').append(`<div>${answerArray[answerArray.length-1].answer}</div>`);
}

function renderHistory(answerArray) {
    $('#history').empty();
    for( let answer of answerArray ) {
        $('#history').append(`<li>${answer.inputOne}${answer.symbol}${answer.inputTwo}=${answer.answer}</li>`);
    }
}

function clearInputFields(){
    $('#add-number-one').val('');
    $('#add-number-two').val('');
}