(function renderPlayerBoard(){
  const playerBoard = document.getElementById('playerGameboard')
  for(let i = 9;i >= 0;i-= 1){
    const boardRow = document.createElement('div')
    boardRow.classList.add('playerGameboard__boardRow')
    for(let j = 0;j <= 9; j+=1){
      const boardCell = document.createElement('div')
      boardCell.classList.add('playerGameboard__boardCell')
      boardCell.setAttribute('data-cell',j)
      boardCell.setAttribute('data-row',i)
      boardRow.append(boardCell)
    }
    playerBoard.append(boardRow)
  }


})();

(function renderBotBoard(){

  const botBoard = document.getElementById('botGameboard')

  for(let i = 9;i >= 0;i-= 1){
    const boardRow = document.createElement('div')
    boardRow.classList.add('botGameboard__boardRow')
    for(let j = 0;j <= 9; j+=1){
      const boardCell = document.createElement('div')
      boardCell.classList.add('botGameboard__boardCell')
      boardCell.setAttribute('data-cell',j)
      boardCell.setAttribute('data-row',i)
      boardRow.append(boardCell)
    }
    botBoard.append(boardRow)
  }


})();