'use strict';

const scores = [0, 0];
let currentScore = 0;
let active = 0;

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let playing = true;

function switchPlayer() {
  document.getElementById(`current--${active}`).textContent = 0;
  currentScore = 0;
  active = active === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //rabdom dice roll
    //for number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //if roll one switch the player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${active}`).textContent = currentScore;
      // currentScore0.textContent = currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[active] += currentScore;
    document.getElementById(`score--${active}`).textContent = scores[active];

    //check if player's score is >= 100
    if (scores[active] >= 100) {
      playing = false;
      //finish the game
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  playing = true;

  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  currentScore0 = 0;
  currentScore1 = 0;
});
