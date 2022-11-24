'use strict'

var elHint = document.querySelector('.hint')

function expandHint(iHint, jHint) {
    var hintLocation = []

    for (var i = iHint; i <= iHint + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = jHint - 1; j <= jHint; j++) {
            if (j < 0 || j >= gBoard[i][j].length) continue
            var currCell = gBoard[i][j]
            if (currCell.isShown) {
                hintLocation.push({ i: i, j: j })
                currCell.isShown = false
            }
        }
    }
    renderBoard(gBoard)
    setTimeout(hideHint, 1000, hintLocation)

}

function hideHint(hintLocation) {
    for (var i = 0; i < hintLocation.length; i++) {
        var iHint = hintLocation[i].i
        var jHint = hintLocation[i].j
        var currCell = gBoard[iHint][jHint]
        currCell.isShown = true
    }
    renderBoard(gBoard)
    gHints.splice(-1)
    var hints = gHints.toString()
    elHint.innerText = hints
}

function hintClicked() {
    if (!gTimerInterval) startTimer()
    return gHintClicked = true
}