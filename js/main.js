'use strict'


// const EMPTY = ' '
const FLAG = '🚩'
const MINE = '💣'
const EMPTY = ' '
const HAPPY = '😄'
const WIN = '😎'
const LOSE = '🤯'
const LIVE = '💖'
const elBtn = document.querySelector('.restartBtn')
const elLives = document.querySelector('h2 .lives')

var gTimerInterval
var gBoard
var gMines = []
var gGame = {
    isOn: false,
    // isOver: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    livesCount: 1
}
var gLevel = {
    SIZE: 4,
    MINES: 2,
    LIVES: 1
}
var gLives





function initGame(length) {
    elBtn.innerText = HAPPY
    gTimerInterval = clearInterval(gTimerInterval)
    var elTime = document.querySelector('.timer span')
    elTime.innerText = '0.000'
    gBoard = buildBoard(length)
    addRandMine(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    gLives = gLevel.LIVES
    elLives.innerText = gLives

}



var currCell = gBoard
// TODO
function cellClicked(currCell, i, j) {
    currCell = gBoard[i][j]
    if (!gTimerInterval) startTimer()
    if (!gGame.isOn || !currCell.isMarked) return
    if (currCell.minesAroundCount > 0 && !currCell.isMine) {
        currCell.isShown = false
        renderBoard(gBoard)
    }

    if (currCell.minesAroundCount === 0 && !currCell.isMine) {
        expandShown(gBoard, currCell, i, j)
    }

    // TODO  !Lose
    if (currCell.isMine) {
        if (gLives === 1 || gLives === 2 || gLives === 3) {
            gLives--
            elLives.innerText = gLives
            // console.log('OOPS ITS A MINE!');
        } else {
            elLives.innerText = 'You Lost! try again.'
            gameLost()
        }
    }

    checkGameWon()
}

// TODO
function cellMarked(i, j) {
    if (gGame.isOn) {
        if (!gTimerInterval) startTimer()
        gBoard[i][j].isMarked = !gBoard[i][j].isMarked
        renderBoard(gBoard)
    }
    checkGameWon()
}



// TODO
function expandShown(board, currCell, i, j) {
    for (var iIdx = i - 1; iIdx <= i + 1; iIdx++) {
        if (iIdx < 0 || iIdx >= board.length) continue;
        for (var jIdx = j - 1; jIdx <= j + 1; jIdx++) {
            if (jIdx < 0 || jIdx >= board[i].length) continue;
            var currCell = board[iIdx][jIdx]
            currCell.isShown = false
        }
    }
    renderBoard(board)
}

// TODO
function checkGameWon() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isMine && currCell.isMarked)
                return
            if (!currCell.isMine && currCell.isShown)
                return
        }
    }

    clearInterval(gTimerInterval)
    elBtn.innerText = WIN
    elLives.innerText = `You won with ${gLives} lives remaining!`
    gGame.isOn = false
}

function gameLost() {
    for (var i = 0; i < gMines.length; i++) {
        var iIdx = gMines[i].i
        var jIdx = gMines[i].j
        var getMines = gBoard[iIdx][jIdx]
        getMines.isShown = false
        renderBoard(gBoard)
        gLives = gLevel.LIVES
    }

    gLives = gLives.LIVES
    elBtn.innerText = LOSE
    clearInterval(gTimerInterval)
    gGame.isOn = false
}



function restartGame() {
    elBtn.innerText = HAPPY

    initGame(gBoard.length)
}



window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    // console.log(e);
}, false)




// function renderLives() {

// }


// function changeLevel(level) {
//     if (level === 'easy') {
//         gLevel.SIZE = 4
//         gLevel.MINES = 2
//         gLevel.LIVES = 1

//     } else if (level === 'medium') {
//         gLevel.SIZE = 8
//         gLevel.MINES = 15
//         gLevel.LIVES = 2
//     } else if (level === 'hard') {
//         gLevel.SIZE = 12
//         gLevel.MINES = 30
//         gLevel.LIVES = 3
//     }
//     restartGame()
// }


