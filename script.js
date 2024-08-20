const blockSize = 25;
const rows = 20;
const columns = 20;
let context;
let board;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let foodX = blockSize * 10;
let foodY = blockSize * 10;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

let gameOver = false;
window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = columns * blockSize;
  context = board.getContext("2d");
  placeFood();
  document.addEventListener("keyup", changeDirection);
  //   update();
  setInterval(update, 1000 / 10);
};

function changeDirection(e) {
  if (e.code === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function update() {
  if (gameOver) return;
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  snakeX += velocityX * 25;
  snakeY += velocityY * 25;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  snakeBody.forEach((i, idx) => {
    context.fillRect(i[0], i[1], blockSize, blockSize);
  });

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX > columns * blockSize ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over");
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * columns) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
