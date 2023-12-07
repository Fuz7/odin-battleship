/* eslint-disable no-param-reassign */
import necoArc from '../class/necoArc';
import necoChaos from '../class/necoChaos';
import generateArrayCoordinates from '../utils/array';
import Gameboard from '../class/gameboard';
import Ship from '../class/ship';


function generateCellsColor(array,bool){
  array.forEach(element=>{
    const cell = document.querySelector(`div[data-row ="${element[1]}"][data-cell="${element[0]}"]`)
    if(cell !== null){
      if(bool === false){
        cell.classList.add('boardCell--invalid')
      } else if(bool === true){
        cell.classList.add('boardCell--valid')
      }
    }

  })
}

function removeCellsColor(){
  const cell = Array.from(document.getElementsByClassName('placeShipBoard__boardCell'))
  if (cell != null){
    cell.forEach((element)=>{
  
      element.classList.remove('boardCell--invalid')
      element.classList.remove('boardCell--valid') 
    })

  }
}



function renderBoardCell(boardId) {
  const board = document.getElementById(boardId);
  const placeShipGameboard = new Gameboard()


  for (let i = 9; i >= 0; i -= 1) {
    const boardRow = document.createElement('div');
    boardRow.classList.add(`${boardId}__boardRow`);
    for (let j = 0; j < 10; j += 1) {
      const boardCell = document.createElement('div');
      boardCell.classList.add(`${boardId}__boardCell`);
      boardCell.setAttribute('data-row', i);
      boardCell.setAttribute('data-cell', j);
      // eslint-disable-next-line prefer-arrow-callback, func-names
      let twoDimensionalCoords;
      let coordValidity
      boardCell.addEventListener('dragenter',function(ev){
        ev.preventDefault();
        const x = parseInt(this.getAttribute('data-cell'),10)
        const y = parseInt(this.getAttribute('data-row'),10)
        const axisButton = document.getElementById('shipAxisButton')
        const axis = axisButton.getAttribute('data-position')
        twoDimensionalCoords = generateArrayCoordinates(4,[x,y],axis)
        coordValidity = placeShipGameboard.checkValidity(twoDimensionalCoords)
        
        
        
      })
      boardCell.addEventListener('dragover',(e)=>{
        e.preventDefault()
        generateCellsColor(twoDimensionalCoords,coordValidity)
      })
      
      boardCell.addEventListener('dragleave',()=>{
        console.log('leaving')
        removeCellsColor()

      })


      boardRow.appendChild(boardCell);
    }
    board.appendChild(boardRow);
  }
}




(function renderAxisButton(){
  const axisButton = document.getElementById('shipAxisButton')
  axisButton.addEventListener('click',()=>{
    const position = axisButton.getAttribute('data-position')
    if(position === 'x-axis'){
      axisButton.setAttribute('data-position','y-axis')
      axisButton.textContent = 'Y-Axis'
    }else if(position === 'y-axis'){
      axisButton.setAttribute('data-position','x-axis')
      axisButton.textContent = 'X-Axis'
    }
  })


})();



function renderFleetImage() {
  const selectedChar = document.getElementById('placeShipContainer').getAttribute('data-char')
  let character;
  if(selectedChar === 'necoChaos') character = necoChaos
  else if(selectedChar === 'necoArc') character = necoArc

  const fleetImages = Array.from(document.getElementsByClassName('fleetContainer__shipImage'))
  fleetImages.forEach((element,index)=>{
    element.style.backgroundImage = `url('./assets/images/${character.images[index]}')`;
    element.classList.remove('fleetContainer__shipImage')
    element.classList.add('fleetContainer__shipImage--loaded')
    element.setAttribute('draggable','true')


  })


}

renderFleetImage()

renderBoardCell('placeShipBoard');
