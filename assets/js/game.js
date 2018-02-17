// Main game file for all logic for hangman

// Create a global object which holds the game state
    // key track of score
    // key track of words
    // keep track of guessed letters
    // interact with user input object

var game = {
    guessed: [],
    guessesRemain: 16,
    wins: 0,
    losses: 0,
    words: [
        'The Proposition',
        'The Good The Bad and The Ugly',
        'Tombstone',
        'A Fistfull of Dollars'
    ],
    round: 0
};

// create a global object which is responsible for taking inputs from the user
    // listen to and handle jey strokes
    // process the input & send values to the game state object
var actions = {
    initHangman: function(){
        
    },
    sendKey: document.onkeydown = function(event){
        console.log(event.key)
    },
    updateState: function(){

    },
    setWord: function(){
        var ourWord = game.words[game.round]
        this.getElement(elementList.wordBlanks).innerHTML = ourWord
    },
    roundEnd: function(){

    },
    getElement: function(id){
        return document.getElementById(id);
    }
};

var elementList = {
    wordBlanks: "word-blanks",
    wrongGuesses: "wrong-guesses",
    guessesLeft: "guesses-left",
    winCounter: "win-counter",
    lossCounter: "loss-counter",
};

//@todo THESE ARE BOGUS ---> create a global object which is responsible for transforming the frontend 
    // get all frontend elements
    // recieve values from the game state object
    // transform the frontend elements based on game state


// Our initialization of the game
(function() {
    // your page initialization code here
    // the DOM will be available here
    // actions.initHangman()
    // alert('test');
    actions.setWord()
})();