/*
From Edgar:
Unnecessary reset css since bootstrap has it already included
favicon.ico error
prolly trade a gradient to blend eastward more into the blue background
not sure why elementList is an object an array makes more sense since this is more of a list as the name implies
using a module appoarch but you still have gobal variables everything can be wrapped in a single function so it is an iffy
module appoarch isnt necessary at the end pick a single 1
3 objects when you can have a single object/
Using alert which is not recommended better to print something to the board/document
Presence of console.log statments
Too many paths/ways to access object properties
i would use -1 instead of < 0.
use of game when you should use this
code is a bit verbose prolly like 100 lines too log

*/


var game = {
    board:{
        updateLetters: function (letter){
          this.answerWord.forEach(function(element,index){
            if(letter === element) game.board.hangmanWord[index]=letter;
          });
        },
        updateGuesses: function (letter){
          this.wrongGuesses.push(letter);
          this.guessesLeft--;
        },
        setProp: function (prop,val) { this[prop] = val },
        getProp: function (prop) { return this[prop];},
        winCounter: 0,
        lossCounter: 0
    },
    wordBank: ['michael','angel','paul','logan','joe','bill','ryan','anthony', 'larry','janet','christian','pickel'],
    ids:['hangmanWord','wrongGuesses','guessesLeft','winCounter','lossCounter'],
    randomize: function(arr){ return arr[Math.floor(Math.random() * arr.length)] },
    hideWord: function(arr){ return Array(arr.length).fill('_') },
    validateInput: function (key){
        if(!/^[a-z]$/.test(key)) return false;  // Makes sure an a-z key is pressed
        if(this.board.wrongGuesses.indexOf(key) >= 0) return false; // Makes sure key isnt already Guessed
        if(this.board.hangmanWord.indexOf(key) >= 0) return false; // Makes sure hangman keys cant be pressed again
        return true;
    },
    takeTurn: function (letter){
        if(this.board.answerWord.indexOf(letter) >= 0) this.board.updateLetters(letter);
        else this.board.updateGuesses(letter);
        this.print(this.ids);
    },
    updateScore: function(){
        if(this.board.guessesLeft === 0) return this.updateLoss();
        if (this.board.hangmanWord.indexOf('_') === -1 ) return this.updateWin();
    },
    updateWin: function() {
        this.board.setProp('winCounter',this.board.winCounter + 1);
        document.getElementById('message').textContent = `Congrats you won the last round.You correctly guessed ${this.board.answerWord.join('')}!!!!`
        this.startGame();
    },
    updateLoss: function (){
        this.board.setProp('lossCounter',this.board.winCounter + 1);
        document.getElementById('message').textContent = `Sorry, you lost the last round. The word was ${this.board.answerWord.join('')}!!!!`
        this.startGame();
    },
    print: function (arr) {
        arr.forEach(function (element){
          document.getElementById(element).textContent = game.splitString(game.board[element]);
        });
    },
    splitString: function(arr){
      if(Array.isArray(arr)) return arr.toString('').replace(/,/g,' ');
      return arr;
    },
    startGame: function () {
        this.board.setProp('answerWord', Array.from(this.randomize(this.wordBank)));
        this.board.setProp('guessesLeft', this.board.answerWord.length);
        this.board.setProp('hangmanWord', this.hideWord(this.board.answerWord));
        this.board.setProp('wrongGuesses', []);
        this.print(this.ids)
    }
}
// keyup event
document.addEventListener('keyup', function(event){
    if(game.validateInput(event.key)){
        game.takeTurn(event.key);
        game.updateScore();
    };
});
game.startGame();