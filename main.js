const playBoard = document.querySelector('.play-board')
const scoreElemt = document.querySelector('.score')
const highScoreElement = document.querySelector('.high-score')


let gameOver = false;
let foodX, foodY
let snakeX = 5, snakeY = 10;
let snakebody = [];
let velocidadeX = 0, velocidadeY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML=`High Score: ${highScore}`

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1
  foodY = Math.floor(Math.random() * 30) + 1
}

const handleGameOver = () => {
  clearInterval(setIntervalId)
  alert("Game Over! Press Ok to replay...")
  location.reload();
}


const changeDirection = (e) => {
  if (e.key === 'ArrowUp' && velocidadeY != 1) {
    velocidadeX = 0;
    velocidadeY = -1;
  } else if (e.key === 'ArrowDown' && velocidadeY != -1) {
    velocidadeX = 0;
    velocidadeY = 1;
  } else if (e.key === 'ArrowLeft' && velocidadeX != 1) {
    velocidadeX = -1;
    velocidadeY = 0;
  } else if (e.key === 'ArrowRight' && velocidadeX != -1) {
    velocidadeX = 1;
    velocidadeY = 0;
  }
  initGame()
}

let initGame = () => {
  if(gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  
  if(snakeX === foodX && snakeY === foodY) {
    changeFoodPosition()
    snakebody.push([foodX, foodY])
    score++;

    highScore = score >=  highScore ? score : highScore
    localStorage.setItem("high-score", highScore)
    scoreElemt.innerHTML=`Score: ${score}`
    highScoreElement.innerHTML=`High Score: ${highScore}`
  }
  
  for (let i = snakebody.length - 1; i > 0; i--) {
    snakebody[i] = snakebody[i - 1]
  }
  snakebody[0] = [snakeX, snakeY];

  snakeX += velocidadeX
  snakeY += velocidadeY

  if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY >30){
    gameOver = true;
  }

  for (let i = 0; i < snakebody.length; i++) {
  htmlMarkup += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
  if(i !== 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0])
  gameOver = true;
}
  playBoard.innerHTML = htmlMarkup
}


changeFoodPosition()
setIntervalId = setInterval(initGame, 125)
document.addEventListener('keydown', changeDirection)


