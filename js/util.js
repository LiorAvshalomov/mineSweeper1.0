'use strict'


function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

//* CREATES BOARD ACCORDING TO SIZE
function buildBoard(length) {
  // var size = gLevel.SIZE
  var board = []
  for (var i = 0; i < length; i++) {
    board.push([])
    for (var j = 0; j < length; j++) {
      board[i][j] = {
        minesAroundCount: 4,
        isShown: true,
        isMine: false,
        isMarked: true
      }
    }
  }

  return board
}


//* GETS A BOARD FROM BUILDBOARD AND RENDERING IT TO THE DOM
function renderBoard(board) {
  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j]
      // var className = 'cell'
      var className = getClassName({ i, j })
      var minesAround = cell.minesAroundCount
      strHTML += `<td class="${className}" onclick="cellClicked(${this},${i},${j})" oncontextmenu="cellMarked(${i},${j})">`
      if (cell.isMine && !cell.isShown && cell.isMarked) strHTML += MINE
      else if (minesAround >= 0 && !cell.isShown) strHTML += minesAround
      else if (!cell.isMarked) strHTML += FLAG
      strHTML += '</td>'
    }


    strHTML += '</tr>';
  }
  var elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHTML;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}




///////////////////////////////////////////////////////////////////////////////////////////////
function shuffle(items) {
  var randIdx, keep, i;
  for (i = items.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, items.length - 1);

    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//* RENDER ONLY CELL TO DOM
// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const cellSelector = '.' + getClassName(location)
  const elCell = document.querySelector(cellSelector)
  elCell.innerHTML = value
}


///////////////////////////////////////////////////////////////////////////////////////////////

//* GET ANY CELL TO AN ARRAY
// function getEmptyCell(board) {
//   const emptyCells = []
//   const mines = []
//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board[i].length; j++) {
//       var currCell = board[i][j]
//       if (currCell.isShown) emptyCells.push({ i: i, j: j })
//     }
//   }
//   //* CHOOSE A RANDOM INDEX FROM THAT ARRAY AND RETURN THE CELL ON THAT INDEX
//   for (var i = 0; i < gLevel.MINES; i++) {
//     const randIdx = getRandomInt.spl(0, emptyCells.length)
//     var mine = emptyCells.splice(randIdx, 1[0])
//     minesArr.push(mine)
//   }
//   return minesArr
// }

///////////////////////////////////////////////////////////////////////////////////////////////

//* SHOW / HIDE ELEMENT
function hideElement(selector) {
  const el = document.querySelector(selector)
  el.classList.add('hidden')
}

function showElement(selector) {
  const el = document.querySelector(selector)
  el.classList.remove('hidden')
}

///////////////////////////////////////////////////////////////////////////////////////////////


// recive an object such as: {i:2, j:7} and returns 'cell-2-7' 
function getSelector(coord) {
  return '.cell-' + coord.i + '-' + coord.j
}


function startTimer() {
  var time = Date.now()
  gTimerInterval = setInterval(() => {
    gGame.secsPassed = (Date.now() - time) / 1000
    const elSpan = document.querySelector('.timer span')
    elSpan.innerText = gGame.secsPassed.toFixed(3)
  }, 10);
}