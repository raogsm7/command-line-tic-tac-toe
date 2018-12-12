// Command Line Tic-Tac-Toe
// Hard Mode - a 2-player game for funsies
// with ability to forfeit the game or optionally play again


// code to bring in the function of prompt
var prompt = require('readline-sync');


//define game
var game = function() {
  this.board = [
    [1, 2, 3], 
    [4, 5, 6], 
    [7, 8, 9]];
  this.player = 'X';
  this.moves = 0;
}

//pritn tictactoe to console
game.prototype.printTicTacToe = function() {

  console.log(`${this.board[0][0]} | ${this.board[0][1]} | ${this.board[0][2]}`);

  console.log(`${this.board[1][0]} | ${this.board[1][1]} | ${this.board[1][2]}`);

  console.log(`${this.board[2][0]} | ${this.board[2][1]} | ${this.board[2][2]}`);
}


game.prototype.placeMove = function(row, col) {
  this.board[row][col] = this.player;
  this.moves++;
}

game.prototype.switchPlayer = function() {
  this.player = this.player === 'X' ? 'O' : 'X';
}


game.prototype.isGameDraw = function() {
  return this.moves === 9;
}


game.prototype.invalidMoves = function(message) {
  console.log(`${message}`);
}

game.prototype.isInvalidMove = function(move) {
  move = Number(move);
  if(move > 9 || move < 1) {
    this.invalidMoves('Enter number between 1 and 9');
    return true;
  } else if(this.isRowCellOccupied(move)) {
    this.invalidMoves('that position is already occupied');
    return true;
  } else {
    return false;
  }
}

game.prototype.isRowCellOccupied = function(move) {
  var {row, col} = this.retRowCol(move);
  var typeString = typeof this.board[row][col];
  return typeString === 'string';
}

game.prototype.retRowCol = function(move) {
  var row = Math.floor((move - 1)/3);
  var col = (move - 1) % 3;
  return {row, col};
}

game.prototype.allEqual = function(a, b, c) {
  return a === b && b === c;
}

game.prototype.isRowWinner = function(row) {
  return this.allEqual(this.board[row][0], this.board[row][1], this.board[row][2]);
}

game.prototype.isColWinner = function(col) {
  return this.allEqual(this.board[0][col], this.board[1][col], this.board[2][col]);
}

game.prototype.isWinner = function(row, col) {
  return 
  	this.isRowWinner(row) || 
  	this.isColWinner(col);
}

game.prototype.playerMove = function() {
  var playMove; 
  do {
    playMove = prompt.question(`Player ${this.player}, your turn! Please choose a move (1-9): `);
  } while(this.isInvalidMove(playMove));
  return this.retRowCol(playMove);
}

game.prototype.play = function() {
  this.printTicTacToe();

  var {row, col} = this.playerMove();
  
  this.placeMove(row, col);
  
  if(this.isWinner(row, col)) {

    console.log(`Congratulations!!! ${this.player} have won!`);
  
  } else if(this.isGameDraw()) {
    
    console.log('This is Draw');    
  
  } else {
  
    this.switchPlayer();
    this.play();
  
  }
}

var game = new game();


game.play();

