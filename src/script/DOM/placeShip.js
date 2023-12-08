/* eslint-disable no-param-reassign */
import necoArc from '../class/necoArc';
import necoChaos from '../class/necoChaos';
import generateArrayCoordinates from '../utils/array';
import Gameboard from '../class/gameboard';
import Ship, {placeShipObject} from '../class/ship';
import { player1,bot } from './charSel';

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

function generateCellImage(array,draggedElement){
  array.forEach(element=>{
    const imageSrc = draggedElement.getAttribute('data-image')
    const cell = document.querySelector(`div[data-row ="${element[1]}"][data-cell="${element[0]}"]`)
    cell.classList.add('boardCell--placed')
    cell.style.backgroundImage = `url('./assets/images/${imageSrc}')`
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

function toggleDraggable(dragElement){
  dragElement.setAttribute('draggable','false')
  dragElement.classList.remove('fleetContainer__shipImage--loaded')
  dragElement.classList.add('fleetContainer__shipImage--placed')
}



function renderBoardCell(boardId) {
  const board = document.getElementById(boardId);
  const placeShipGameboard = new Gameboard()
  player1.gameboard = placeShipGameboard;
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
      // eslint-disable-next-line func-names
      boardCell.addEventListener('dragenter',function(e){
        e.preventDefault();
        const x = parseInt(this.getAttribute('data-cell'),10)
        const y = parseInt(this.getAttribute('data-row'),10)
        const dragId = placeShipObject.id
        const dragElement = document.getElementById(dragId)
        const shipLenght = parseInt(dragElement.getAttribute('data-length'),10)
        const axisButton = document.getElementById('shipAxisButton')
        const axis = axisButton.getAttribute('data-position')
        twoDimensionalCoords = generateArrayCoordinates(shipLenght,[x,y],axis)
        coordValidity = player1.gameboard.checkValidity(twoDimensionalCoords)
        
        
        
      })
      boardCell.addEventListener('dragover',(e)=>{
        e.preventDefault()
        generateCellsColor(twoDimensionalCoords,coordValidity)
      })
      
      boardCell.addEventListener('dragleave',()=>{
        removeCellsColor()
      })

      boardCell.addEventListener('drop',(ev)=>{
        const dragId = placeShipObject.id
        const dragElement = document.getElementById(dragId)
        const cell = ev.target
        const x = parseInt(cell.getAttribute('data-cell'),10)
        const y = parseInt(cell.getAttribute('data-row'),10)
        const axisButton = document.getElementById('shipAxisButton')
        const axis = axisButton.getAttribute('data-position')
        const shipLenght = parseInt(dragElement.getAttribute('data-length'),10)
        twoDimensionalCoords = generateArrayCoordinates(shipLenght,[x,y],axis)
        coordValidity = placeShipGameboard.checkValidity(twoDimensionalCoords)
        if(coordValidity === true){
          const ship =  new Ship(shipLenght,twoDimensionalCoords)
          removeCellsColor()
          player1.gameboard.placeShip(ship) 
          generateCellImage(twoDimensionalCoords,dragElement)
          toggleDraggable(dragElement)
          console.log(player1.gameboard.ships)
        }else{
          removeCellsColor()
        }
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

(function renderResetButton(){
  


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
    element.setAttribute('data-image',character.images[index])
    element.setAttribute('id',`placeShipImage${5 - index}`)

    element.addEventListener('dragstart',(ev)=>{
      placeShipObject.id = ev.target.id
    })



  })


}

renderFleetImage()

renderBoardCell('placeShipBoard');
