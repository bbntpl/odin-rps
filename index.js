'use strict'

//HTML elements
const optionTxt = document.querySelector('.option');
const outcomeTxt = document.querySelector('.outcome-txt');
const optionButtons = document.querySelectorAll('.game__item');
const restartBtn = document.querySelector('.restart-btn');

const OPTIONS = ['rock', 'scissors', 'paper'];


class Player {
    constructor(name, selection, wins) {
        this.name = name;
        this.selection = selection;
        this.wins = wins;
    }
}

class Round {
    constructor(number) {
        this.number = number;
    }
}

class Game {
    constructor(roundNum) {

    }
    get gameWinner() {
        return
    }
}

const playerUser = new Player('player', 'rock', 0);
const computerUser = new Player('computer', computerPlay(), 0);
function computerPlay() {
    return OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
}

function playRound(playerUser, computerUser) {
    computerUser.selection = computerPlay();
    if (playerUser.selection !== computerUser.selection) {
        if (playerUser.selection.toLowerCase() === 'rock' && computerUser.selection.toLowerCase() === 'scissors') {
            return `You beat the computer with rock`;
        } if (playerUser.selection.toLowerCase() === 'scissors' && computerUser.selection.toLowerCase() === 'paper') {
            return `You beat the computer with scissors`;
        } if (playerUser.selection.toLowerCase() === 'paper' && computerUser.selection.toLowerCase() === 'rock') {
            return `You beat the computer with paper`;
        } if (computerUser.selection.toLowerCase() === 'rock' && playerUser.selection.toLowerCase() === 'scissors') {
            return `The computer beat you with rock`;
        } if (computerUser.selection.toLowerCase() === 'scissors' && playerUser.selection.toLowerCase() === 'paper') {
            return `The computer beat you with scissors`;
        } else {
            return `The computer beat you with paper`;
        }
    } else {
        return 'Both parties are tie';
    }
}

//Event listeners
restartBtn.addEventListener('click', () => {
    outcomeTxt.textContent = 'choose a form';
})
for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener('click', function() {
        playerUser.selection = optionButtons[i].id;
        outcomeTxt.textContent = playRound(playerUser, computerUser);
    });
}