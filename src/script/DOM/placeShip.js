function renderBoardCell(boardId){
  const board = document.getElementById(boardId)
  for(let i = 0;i < 10; i+= 1){
    const boardRow = document.createElement('div')
    boardRow.classList.add(`${boardId}__boardRow`)
    for(let j = 0; j < 10; j+= 1){
      const boardCell = document.createElement('div')
      boardCell.classList.add(`${boardId}__boardCell`)
      boardCell.setAttribute('data-row',i)
      boardCell.setAttribute('data-cell',j)
      boardRow.appendChild(boardCell)
    }
    board.appendChild(boardRow)
  }
}


renderBoardCell('placeShipBoard')