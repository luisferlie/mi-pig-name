//Botones

const rollDiceBtn = document.querySelector('.btn.btn--roll')
const newGameBtn = document.querySelector('.btn--new')
const holdBtn = document.querySelector('.btn--hold')

//info players

const player1Section = document.querySelector('.player.player--0')
const player2Section = document.querySelector('.player.player--1')
const player1ScoreEl = document.getElementById('score--0')
const player2ScoreEl = document.getElementById('score--1')
const player1CurrentScoreEl = document.querySelector('#current--0')
const player2CurrentScoreEl = document.querySelector('#current--1')
const alerta = document.querySelector('.alert')
const diceImg = document.querySelector('.dice')

/* test -->diceImg.src = 'dice-6.png' */
let currentTurn = 0
let player1Score = 0
let player2Score = 0

let player1CurrentScore = 0
let player2CurrentScore = 0

init()
newGameBtn.addEventListener('click', init)
rollDiceBtn.addEventListener('click', play)
holdBtn.addEventListener('click', updateScores)

function init() {
  currentTurn = 0 /* 0 es para el jugador 1 y 1 para el 2*/
 
  player1CurrentScore = 0
  player2CurrentScore = 0
  player1Score = 0
  player2Score = 0
  player1CurrentScoreEl.textContent = 0
  player2CurrentScoreEl.textContent = 0
  player1ScoreEl.textContent = 0
  player2ScoreEl.textContent = 0
}

function randomDiceGen() {
  return Math.floor(Math.random() * 6) + 1 /*devuelve un numero*/
}

function play() {
    console.log('current turn',currentTurn)

  let num = randomDiceGen()
  console.log('jugando')
  console.log(num)

  if (currentTurn === 0) {
    if (num == 1) {
    diceImg.src = `dice-${num}.png`
      alerta.textContent = 'pierdes turno'
      setTimeout(() => {
        alerta.style.display = 'none'
      }, 2000)
      player1CurrentScore=0
      player1CurrentScoreEl.textContent = 0
      
      player1Section.classList.remove('player--active')
      player2Section.classList.add('player--active')
      currentTurn = 1
      return
    }
    if (num !== 1) {
      diceImg.src = `dice-${num}.png`
      player1CurrentScore += num
      player1CurrentScoreEl.textContent = player1CurrentScore
    }
  }
  if (currentTurn == 1) {
    if (num == 1) {
      alerta.textContent = 'pierdes turno'
      setTimeout(() => {
        alerta.style.display = 'none'
      }, 2000)
      player2CurrentScore=0
      player2CurrentScoreEl.textContent = 0
      player2Section.classList.remove('player--active')
      player1Section.classList.add('player--active')
      currentTurn = 0
      return
    }
    if (num !== 1) {
      diceImg.src = `dice-${num}.png`
      player2CurrentScore += num
      player2CurrentScoreEl.textContent = player2CurrentScore
    }
  }
}
function updateScores() {
    console.log('currentTurn actualizando',currentTurn)
  if (currentTurn==0) {
    player1Score += player1CurrentScore
    player1CurrentScore = 0
    player1CurrentScoreEl.textContent = 0
    player1ScoreEl.textContent = player1Score
    currentTurn=1
    player1Section.classList.remove('player--active')
    player2Section.classList.add('player--active')
    console.log( 'playe1score', player1Score)

    if(Number(player1Score)>30){
        console.log('entro')
        alerta.style.display='block'
        alerta.style.zIndex=10
        alerta.style.fontSize ='6rem'
        alerta.innerHTML = '<h1>ha ganado el jugador 1</h1>'
        setTimeout(()=>{
            alerta.style.fontSize ='2rem'
            alerta.textContent = ''
            alerta.style.display='none'
            newGameBtn.click()

        },3000)
    }

    return
    

  }
  if (currentTurn==1) {
    player2Score += player2CurrentScore
    player1CurrentScore = 0
    player2CurrentScoreEl.textContent = 0
    player2ScoreEl.textContent = player2Score
    currentTurn=0
    player2Section.classList.remove('player--active')
    player1Section.classList.add('player--active')
    console.log( 'playe2score', player2Score)
    if(player2Score>30){
        alerta.style.display='block'
        alerta.style.zIndex=10
        alerta.style.fontSize ='6rem'
        alerta.innerHTML = '<h1>ha ganado el jugador 2</h1>'
        setTimeout(()=>{
            alerta.style.fontSize ='2rem'
            alerta.textContent = ''
            alerta.style.display='none'
            newGameBtn.click()
        },2000)
    }
    return
  }
}
