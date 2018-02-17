// Main game file for all logic for hangman

// Create a global object which holds the game state
    // key track of score
    // key track of words
    // keep track of guessed letters
    // interact with user input object

var elementList = {
    wordBlanks: "word-blanks",
    wrongGuesses: "wrong-guesses",
    guessesLeft: "guesses-left",
    winCounter: "win-counter",
    lossCounter: "loss-counter",
};

var game = {
    guessed: [],
    wrongGuesses: [],
    guessesRemain: 12,
    wins: 0,
    losses: 0,
    words: [
        'the proposition',
        'the good the bad and the ugly',
        'tombstone',
        'a fistfull of dollars'
    ],
    round: 0,
    currentWord: "",
    wordMask: ""
};

// create a global object which is responsible for taking inputs from the user
    // listen to and handle jey strokes
    // process the input & send values to the game state object
var actions = {
    initHangman: function(){
        // Set frontend element starting states
        this.roundStart()

        //listen for keys
        document.onkeydown = this.checkKey
    },
    roundStart: function(){
        this.setWord()
        guessesRemain = 12
        this.setGuessesLeft(guessesRemain)
        this.setWinLoss()
        this.setGuessedLetters(true)
        game.wrongGuesses = []
        game.guessed = []
    },
    roundUpdate: function(){
        this.setGuessesLeft()
        this.setGuessedLetters()
        // Check if there was a win/loss
        if(this.checkWinLoss()){
            game.round++
            this.roundStart()
        }
    },
    // Takes inputs and makes guesses, also updates the round, big boi
    checkKey: function(event){
        console.log(event.key)//show pressed key
        
        // get the user letter
        userLetter = event.key.toLowerCase()
        
        // make the guess wit the user letter
        var userGuess = actions.makeGuess(userLetter)// @todo TA, is this cheating?
        console.log(userGuess)
        
        // update the game frontend
        actions.roundUpdate()
    },
    checkWinLoss: function(){
        if(game.guessesRemain === 0){
            alert("You Lose!");
            game.losses++
            this.roundStart()
            return true
        }else if( game.wordMask === game.currentWord ){
            alert("You Win!")
            game.wins++
            this.roundStart()
            return true
        }
        return false
    },
    setWord: function(){
        var ourWord = game.words[game.round]
        game.currentWord = ourWord
        game.wordMask = this.setWordMask(ourWord)
        this.getEl(elementList.wordBlanks).innerHTML = game.wordMask
    },
    setGuessesLeft: function(guesses = null){
        if(guesses === null){
            this.setEl(elementList.guessesLeft, game.guessesRemain)
        }else{
            this.setEl(elementList.guessesLeft, guesses)
        }
    },
    setGuessedLetters: function(clear = null){
        if(clear === null){
            this.setEl(elementList.wrongGuesses, game.wrongGuesses)
        }else{
            this.setEl(elementList.wrongGuesses, "")
        }
        
    },
    setWinLoss: function(){
        this.setEl(elementList.winCounter, game.wins)
        this.setEl(elementList.lossCounter, game.losses)
    },
    setEl: function(id, val){
        return document.getElementById(id).innerHTML = val;
    },
    getEl: function(id){
        return document.getElementById(id);
    },
    setWordMask: function(word){
        var maskedWord = ""
        var exp = /^[a-zA-Z]+$/
        for (let i = 0; i < word.length; i++) {
            letter = word.charAt(i);
            maskedWord = maskedWord + (exp.exec(letter) ? "_" : " ")
        }
        return maskedWord
    },
    // Another boi that does a lot
    makeGuess: function(letter){
        // if user letter is NOT part of guessed
        if(game.guessed.indexOf(letter) < 0){
            // add to the guessed array
            game.guessed.push(letter)

            if(game.currentWord.indexOf(letter) > (-1)){
                //guessed right
                console.log("got 'eem")
                console.log(this.reverseMask(letter))
                actions.setEl( elementList.wordBlanks, this.reverseMask(letter))

                return true
            }else{
                //guessed wrong
                console.log("didn't get 'eem")
                // add to the guessed wrong array
                game.wrongGuesses.push(letter)
                
                // Deplete guesses
                --game.guessesRemain
                
                return false
            }// end else if currentWord contains userletter
        }// end if user letter was guessed before

        // guess was already made before
        return false
    },
    reverseMask: function(letter){
        var indvWordsMasked = game.wordMask.split(" ")
        var indvWord = game.currentWord.split(" ")
        var indvWordMaskedAssembled = []
        var word = game.currentWord
        var exp = /^[a-zA-Z]+$/
        var w = 0

        indvWordsMasked.forEach(function(maskedWord){
            
            var oneMaskedWordArr = maskedWord.split("")
            var indvWordArr = indvWord[w].split("")
            
            for (let i = 0; i < oneMaskedWordArr.length; i++) {
    
                if( indvWordArr[i] == letter ){
                    oneMaskedWordArr[i] = letter
                }
            }
            console.log(oneMaskedWordArr)
            fullMaskedWord = oneMaskedWordArr.join("")
            indvWordMaskedAssembled.push(fullMaskedWord)
            
            w++
        })

        return game.wordMask = indvWordMaskedAssembled.join(" ")
    }
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
    actions.initHangman()
})();