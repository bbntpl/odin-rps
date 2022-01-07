'use strict'
//HTML elements
//single inputs
const roundBtn = document.querySelector('.round-btn');

//array of classes
const restartBtns = document.querySelectorAll('.restart-btn');
const outcomeTxt = document.querySelectorAll('.outcome-txt');
const optionButtons = document.querySelectorAll('.game__item');
const roundSelections = document.querySelectorAll('.rounds');
const totalRoundsEl = document.querySelectorAll('.game__total-rounds');
const playerScoreEl = document.querySelectorAll('.player-score');
const computerScoreEl = document.querySelectorAll('.computer-score');

//single class
const roundNum = document.querySelector('.round-num');
const endTxt = document.querySelector('.end-text');
const disableOverlayEl = document.querySelector('.disable-overlay');

//array of RPS forms
const OPTIONS = ['rock', 'scissors', 'paper'];

//global changeable variables
let totalRounds = 3;
let currentRound = 1;

//Player object
class Player {
    constructor(name, selection, wins) {
        this.name = name;
        this.selection = selection;
        this.wins = wins;
    }
}

//Named classes
const playerUser = new Player('player', 'rock', 0);
const computerUser = new Player('computer', computerPlay(), 0);

//Randomly assign move for the computer
function computerPlay() {
    return OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
}

function playRound(playerUser, computerUser) {
    //Changes the move of the computer every round
    computerUser.selection = computerPlay();
    return validateRoundWinner(playerUser);
}

function validateRoundWinner(playerUser) {
    //Compare the selection of the players and return an output
    if (playerUser.selection !== computerUser.selection) {
        if (playerUser.selection.toLowerCase() === 'rock' && computerUser.selection.toLowerCase() === 'scissors') {
            playerUser.wins++;
            return `You beat the computer with rock`;
        } else if (playerUser.selection.toLowerCase() === 'scissors' && computerUser.selection.toLowerCase() === 'paper') {
            playerUser.wins++;
            return `You beat the computer with scissors`;
        } else if (playerUser.selection.toLowerCase() === 'paper' && computerUser.selection.toLowerCase() === 'rock') {
            playerUser.wins++;
            return `You beat the computer with paper`;
        } else if (computerUser.selection.toLowerCase() === 'rock' && playerUser.selection.toLowerCase() === 'scissors') {
            computerUser.wins++;
            return `The computer beat you with rock`;
        } else if (computerUser.selection.toLowerCase() === 'scissors' && playerUser.selection.toLowerCase() === 'paper') {
            computerUser.wins++;
            return `The computer beat you with scissors`;
        } else {
            computerUser.wins++;
            return `The computer beat you with paper`;
        }
    } else {
        return 'Both parties are tie';
    }
}

function game() {
    disableRestart();
    changeOutcomeTxt(playRound(playerUser, computerUser));
    updateDisplayedOutputs();
    currentRound++;
    if (totalRounds >= currentRound) return;
    printGameOutcome(playerUser.wins, computerUser.wins);
    disableGame();
}

function updateDisplayedOutputs() {
    //The amount of iteration is two for there are two total elmenets: default and mobile
    for (let i = 0; i < 2; i++) {
        playerScoreEl.forEach((el) => {
            el.textContent = playerUser.wins;
        })
        computerScoreEl.forEach((el) => {
            el.textContent = computerUser.wins;
        })
    }
}

function printGameOutcome(playerScore, computerScore) {
    if (playerScore === computerScore) {
        endTxt.textContent = 'It\'s a tie!';
    } else {
        endTxt.textContent = `You ${playerScore > computerScore ? 'won!' : 'lost!'}`;
    }
}

//Change the text content of multiple outcome text
function changeOutcomeTxt(outcome) {
    for (let i = 0; i < outcomeTxt.length; i++) {
        outcomeTxt[i].textContent = outcome;
    }
}

function restartGame() {
    outcomeTxt.textContent = changeOutcomeTxt('choose your form');
    currentRound = 1;
    playerUser.wins = 0;
    computerUser.wins = 0;
    endTxt.textContent = '';
    disableRestart();
    updateDisplayedOutputs();
}

//mutating style value for pre/post game
function prePostGame(restartBtnDisplay, disableOverlayDisplay) {
    for (let i = 0; i < restartBtns.length; i++) {
        restartBtns[i].style.display = restartBtnDisplay;
    }
    disableOverlayEl.style.display = disableOverlayDisplay;
    totalRoundsEl.forEach((el) => {
        el.style.display = disableOverlayDisplay;
    });
}

function disableGame() {
    prePostGame('initial', 'flex');
}

function disableRestart() {
    prePostGame('none', 'none')
}

//invoked after webpage loads
function initialize() {
    disableRestart();
    updateDisplayedOutputs();
}

//Add event listener to restart btns so the user can restart the game
for (let i = 0; i < restartBtns.length; i++) {
    restartBtns[i].addEventListener('click', () => {
        restartGame();
    })
}


for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener('click', function () {
        playerUser.selection = this.id;
        game();
    });
}

//Set total rounds of a game when either select tag changed
for (let i = 0; i < roundSelections.length; i++) {
    //Set total rounds of a game when either select tag changed
    roundSelections[i].addEventListener('change', function () {
        console.log(this);
        const inputText = this.value;
        totalRounds = inputText;
    });
}

initialize();