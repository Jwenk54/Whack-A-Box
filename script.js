const gameArea = document.getElementById('gameArea');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('startBtn');

const highScoreEl = document.getElementById('highScore');
const highInitialsEl = document.getElementById('highInitials');

let score = 0;
let time = 30;
let target = null;
let gameInterval = null;
let moveTimer = null;

// High score (local storage)
function loadHighScore() {
    const savedScore = localStorage.getItem('highScore')
    const savedInitials = localStorage.getItem('highInitials')

    if (savedScore) {
        highScoreEl.textContent = savedScore;
    }else {
        highScoreEl.textContent = '0';
    }

    if (savedInitials) {
        highInitialsEl.textContent = savedInitials;
    } else {
        highInitialsEl.textContent = '---';
    }
}

function saveHighScore(newScore, initials) {
    localStorage.setItem('highScore', newScore);
    localStorage.setItem('highInitials', initials);

    highScoreEl.textContent = newScore;
    highInitialsEl.textContent = initials;
}

function checkHighScore() {
    const currentHighScore = Number(localStorage.getItem('highScore')) || 0;

    if (score > currentHighScore) {
        let initials = prompt("New High Score! Enter your initials:");

    // Force exactly 3 letters
        initials = initials.replace(/[^A-Z]/g,'')
        if (initials.length < 3) {
            initials = initials.padEnd(3, 'A');
        }
        if (initials.length > 3) {
            initials = initials.slice(0, 3);
        }
        saveHighScore(score, initials);
        }
    }
    // Game Functions

function createTarget() {
    target = document.createElement('div');
    target.classList.add('target');

    target.addEventListener('click', () => {
        score++;
        scoreEl.textContent = score;
        moveTarget();
});

gameArea.appendChild(target);

target.style.left = "0px";
target.style.top = "0px";

moveTarget();
}

function moveTarget() {
    if (!target) return;

    const maxX = gameArea.offsetWidth - 60;
    const maxY = gameArea.offsetHeight - 60;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
}

function startGame() {

    clearInterval(gameInterval);
    clearInterval(moveTimer);
    //reset
    score = 0;
    time = 30;
    scoreEl.textContent = score;
    timeEl.textContent = time;

    startBtn.disabled = true;
    gameArea.innerHTML = '';

    createTarget();
    //move target every 700ms
    moveTimer = setInterval(moveTarget, 700);
    //countdown timer
    gameInterval = setInterval(() => {
        time--;
        timeEl.textContent = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(moveTimer);

    startBtn.disabled = false;
    gameArea.innerHTML = "";
    target = null;

    checkHighScore();

    alert(`Game Over! Your score is: ${score}`);
}

startBtn.addEventListener('click', startGame);

loadHighScore();
