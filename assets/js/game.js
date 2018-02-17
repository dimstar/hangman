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
    ]
}

// create a global object which is responsible for taking inputs from the user
    // listen to and handle jey strokes
    // process the input & send values to the game state object
var actions = {

}

// create a global object which is responsible for transforming the frontend 
    // get all frontend elements
    // recieve values from the game state object
    // transform the frontend elements based on game state
var interface = {
    wordBlanks: document.getElementById("word-blanks"),
    wrongGuesses: document.getElementById("wrong-guesses"),
    guessesLeft: document.getElementById("guesses-left"),
    winCounter: document.getElementById("win-counter"),
    lossCounter: document.getElementById("loss-counter")
}
