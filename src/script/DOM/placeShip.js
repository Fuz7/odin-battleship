/* eslint-disable no-param-reassign */
import generateArrayCoordinates, { randomizeArray } from '../utils/array';
import Gameboard from '../class/gameboard';
import Ship, {placeShipObject} from '../class/ship';
import { player1 } from './charSel';

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

function toggleContinueButton(){
  const continueButton = document.getElementById('placeShipPage__continueButton')

  if(player1.gameboard.ships.length === 5){
    continueButton.classList.remove('placeShipPage__continueButton--invalid')
    continueButton.classList.add('placeShipPage__continueButton--valid')
  }else{
    continueButton.classList.remove('placeShipPage__continueButton--valid')
    continueButton.classList.add('placeShipPage__continueButton--invalid')

  }
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
      let coordValidity;
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
          ship.icon = dragElement.getAttribute('data-image')
          removeCellsColor()
          player1.gameboard.placeShip(ship) 
          generateCellImage(twoDimensionalCoords,dragElement)
          toggleDraggable(dragElement)
          console.log(player1.gameboard.ships)
        }else{
          removeCellsColor()
        }
        toggleContinueButton();
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
  const resetButton = document.getElementById('placeShipPage__resetButton')

  resetButton.addEventListener('click',()=>{
    const placedCell = Array.from(document.getElementsByClassName('boardCell--placed'))
    const draggedImages = Array.from(document.getElementsByClassName('fleetContainer__shipImage--placed'))
    placedCell.forEach((cell)=>{
      cell.style.backgroundImage = 'none';
      cell.classList.remove('boardCell--placed')
    })
    player1.gameboard.clearShip()
    draggedImages.forEach((shipImage)=>{
      shipImage.setAttribute('draggable','true')
      shipImage.classList.remove('fleetContainer__shipImage--placed')
      shipImage.classList.add('fleetContainer__shipImage--loaded')
    })
    toggleContinueButton()
  })

})();

(function renderContinueButton(){
  const continueButton = document.getElementById('placeShipPage__continueButton')
  const placeShipContainer = document.getElementById('placeShipPage')
  const mainGameContainer = document.getElementById('mainGameContainer')
  continueButton.addEventListener('click',()=>{
    if(continueButton.classList.contains('placeShipPage__continueButton--valid')){
      placeShipContainer.classList.remove('placeShipContainer--visible')
      placeShipContainer.classList.add('placeShipContainer')
      mainGameContainer.classList.add('mainGameContainer--visible')
    }
  })
})();
  

(function renderReshuffleButton(){
 
  const reshuffleButton = document.getElementById('placeShipPage__reshuffleButton')
  reshuffleButton.addEventListener('click',()=>{
    const placedImages = Array.from(document.getElementsByClassName('fleetContainer__shipImage--placed'))
    const loadedImages = Array.from(document.getElementsByClassName('fleetContainer__shipImage--loaded'))

    const placedImagesArr = placedImages.map((element)=>{
      const imageSrc = element.getAttribute('data-image')
      return imageSrc
    })

    const arrWithoutPlacedImage = player1.char.images.filter((image)=>{
      if(placedImagesArr.includes(image)) return false
      return true
    })
    
    const randomizedWithoutPlacedImage = randomizeArray(arrWithoutPlacedImage)

    loadedImages.forEach((element,index)=>{
      element.style.backgroundImage = `url('./assets/images/${randomizedWithoutPlacedImage[index]}')`
      element.setAttribute('data-image',randomizedWithoutPlacedImage[index])
    })

  
  
  })

})();




renderBoardCell('placeShipBoard');
