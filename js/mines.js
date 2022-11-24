'use strict'


function countNeighbors(cellI, cellJ, board) {
    var neighborsCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) neighborsCount++
        }
    }
    return neighborsCount;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            cell.minesAroundCount = countNeighbors(i, j, gBoard)
        }
    }
}



function addRandMine(board) {
    var minesCount

    if (board.length === 4) minesCount = 2
    if (board.length === 8) minesCount = 10
    if (board.length === 12) minesCount = 20

    for (var i = 0; i < minesCount; i++) {
        var getRandI = getRandomInt(0, board.length)
        var getRandJ = getRandomInt(0, board.length)
        board[getRandI][getRandJ].isMine = true
        gMines[i] = { i: getRandI, j: getRandJ }
    }
    return gMines
}