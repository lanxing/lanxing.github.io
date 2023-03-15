var emptyRow, emptyCol;

function createGameBoard() {
  var gameBoard = document.getElementById("game-area");
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, ""];
  emptyRow = 2;
  emptyCol = 2;
  shuffle(numbers);
  for (var i = 0; i < numbers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = numbers[i];
    if (numbers[i] == "") {
      div.className = "empty";
    }
    gameBoard.appendChild(div);
  }
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function moveNumber(row, col) {
  var gameBoard = document.getElementById("game-area");
  var number = gameBoard.children[row * 3 + col];
  var empty = gameBoard.children[emptyRow * 3 + emptyCol];
  if (
    (row == emptyRow && Math.abs(col - emptyCol) == 1) ||
    (col == emptyCol && Math.abs(row - emptyRow) == 1)
  ) {
    empty.innerHTML = number.innerHTML;
    empty.className = "";
    number.innerHTML = "";
    number.className = "empty";
    emptyRow = row;
    emptyCol = col;
    if (checkWin()) {
      alert("恭喜你，你赢了！");
    }
  }
}

function checkWin() {
  var gameBoard = document.getElementById("game-area");
  for (var i = 0; i < gameBoard.children.length - 1; i++) {
    if (gameBoard.children[i].innerHTML != i + 1) {
      return false;
    }
  }
  return true;
}

document.getElementById("start-btn").addEventListener("click", function () {
  var gameBoard = document.getElementById("game-area");
while (gameBoard.firstChild) {
gameBoard.removeChild(gameBoard.firstChild);
}
createGameBoard();
});

document.getElementById("reset-btn").addEventListener("click", function () {
var gameBoard = document.getElementById("game-area");
for (var i = 0; i < gameBoard.children.length; i++) {
gameBoard.children[i].innerHTML = i + 1;
gameBoard.children[i].className = "";
}
gameBoard.children[gameBoard.children.length - 1].innerHTML = "";
gameBoard.children[gameBoard.children.length - 1].className = "empty";
emptyRow = 2;
emptyCol = 2;
});

var gameBoard = document.getElementById("game-area");
gameBoard.addEventListener("click", function (event) {
var number = event.target;
var row = Math.floor(Array.from(number.parentNode.children).indexOf(number) / 3);
var col = Array.from(number.parentNode.children).indexOf(number) % 3;
moveNumber(row, col);
});