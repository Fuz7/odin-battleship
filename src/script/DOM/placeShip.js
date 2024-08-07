/* eslint-disable no-param-reassign */
import Ship, { placeShipObject } from '../class/ship';
import { game } from './charSel';
import { generateOpponentGameboard } from '../utils/random';
import { renderAttackingPlayer } from '../utils/attack';
import {generateBattleEntranceVoiceLines } from '../utils/voiceLines';
import renderBotBoard, { renderPlayerBoard, reshuffleImages } from './battle';
import generateArrayCoordinates from '../utils/array';

function renderPlayerCellImage() {
  let cellImage;

  const boardCell = Array.from(document.getElementsByClassName('boardCell__withImage'))
  boardCell.forEach((cell)=>{
    cell.classList.remove('boardCell__withImage')
    cell.style.backgroundImage= ''
  })

  const boardAttacked = Array.from(document.getElementsByClassName('animating'))
  boardAttacked.forEach((cell)=>{
    cell.classList.remove('animating')
    cell.classList.remove('boardCell--attacked')
  })

  game.player.gameboard.ships.forEach((ship) => {
    ship.coord.forEach((pos) => {
      cellImage = document.querySelector(
        `div[class="playerGameboard__boardCell"][data-cell="${pos[0]}"][data-row="${pos[1]}"]`,
      );
      cellImage.classList.add('boardCell__withImage');
      cellImage.style.backgroundImage = `url('./assets/images/${ship.icon}')`;
    });
  });

}
// function renderBotCellImage(){
//   let cellImage;

//   game.bot.gameboard.ships.forEach(ship => {

//     ship.coord.forEach((pos) =>{
//       cellImage = document.querySelector(`div[class="botGameboard__boardCell"][data-cell="${pos[0]}"][data-row="${pos[1]}"]`)
//       cellImage.classList.add('boardCell__withImage')
//       cellImage.style.backgroundImage = `url('./assets/images/${ship.icon}')`
//     })
//   });

// }

function generateCellsColor(array, bool) {
  array.forEach((element) => {
    const cell = document.querySelector(
      `div[data-row ="${element[1]}"][data-cell="${element[0]}"]`,
    );
    if (cell !== null) {
      if (bool === false) {
        cell.classList.add('boardCell--invalid');
      } else if (bool === true) {
        cell.classList.add('boardCell--valid');
      }
    }
  });
}

function generateCellImage(array, draggedElement) {
  array.forEach((element) => {
    const imageSrc = draggedElement.getAttribute('data-image');
    const cell = document.querySelector(
      `div[data-row ="${element[1]}"][data-cell="${element[0]}"]`,
    );
    cell.classList.add('boardCell--placed');
    cell.style.backgroundImage = `url('./assets/images/${imageSrc}')`;
  });
}

function removeCellsColor() {
  const cell = Array.from(
    document.getElementsByClassName('placeShipBoard__boardCell'),
  );
  if (cell != null) {
    cell.forEach((element) => {
      element.classList.remove('boardCell--invalid');
      element.classList.remove('boardCell--valid');
    });
  }
}

function toggleDraggable(dragElement) {
  dragElement.setAttribute('draggable', 'false');
  dragElement.classList.remove('fleetContainer__shipImage--loaded');
  dragElement.classList.add('fleetContainer__shipImage--placed');
}

function toggleContinueButton() {
  const continueButton = document.getElementById(
    'placeShipPage__continueButton',
  );

  if (game.player.gameboard.ships.length === 5) {
    continueButton.classList.remove('placeShipPage__continueButton--invalid');
    continueButton.classList.add('placeShipPage__continueButton--valid');
  } else {
    continueButton.classList.remove('placeShipPage__continueButton--valid');
    continueButton.classList.add('placeShipPage__continueButton--invalid');
  }
}

function addPlayerShipNames(){
  for(let i = 0;i < 5;i+= 1){
    const shipName = document.getElementById(`placeShip${i + 1}`).value
    const sortedShips = game.player.gameboard.ships.sort((a,b)=> a.lenght-b.lenght)
    const ship = sortedShips[i]
    ship.shipName = shipName
  }
}


function renderBoardCell(boardId) {
  const board = document.getElementById(boardId);
  
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
      boardCell.addEventListener('dragenter', function (e) {
        e.preventDefault();
        const x = parseInt(this.getAttribute('data-cell'), 10);
        const y = parseInt(this.getAttribute('data-row'), 10);
        const dragId = placeShipObject.id;
        const dragElement = document.getElementById(dragId);
        const shipLenght = parseInt(
          dragElement.getAttribute('data-length'),
          10,
        );
        const axisButton = document.getElementById('shipAxisButton');
        const axis = axisButton.getAttribute('data-position');
        twoDimensionalCoords = generateArrayCoordinates(
          shipLenght,
          [x, y],
          axis,
        );
        coordValidity =
          game.player.gameboard.checkValidity(twoDimensionalCoords);
      });
      boardCell.addEventListener('dragover', (e) => {
        e.preventDefault();
        generateCellsColor(twoDimensionalCoords, coordValidity);
      });

      boardCell.addEventListener('dragleave', () => {
        removeCellsColor();
      });

      boardCell.addEventListener('drop', (ev) => {
        const dragId = placeShipObject.id;
        const dragElement = document.getElementById(dragId);
        const cell = ev.target;
        const x = parseInt(cell.getAttribute('data-cell'), 10);
        const y = parseInt(cell.getAttribute('data-row'), 10);
        const axisButton = document.getElementById('shipAxisButton');
        const axis = axisButton.getAttribute('data-position');
        const shipLenght = parseInt(
          dragElement.getAttribute('data-length'),
          10,
        );
        twoDimensionalCoords = generateArrayCoordinates(
          shipLenght,
          [x, y],
          axis,
        );
        coordValidity = game.player.gameboard.checkValidity(twoDimensionalCoords);
        if (coordValidity === true) {
          const ship = new Ship(shipLenght, twoDimensionalCoords);
          ship.icon = dragElement.getAttribute('data-image');
          removeCellsColor();
          game.player.gameboard.placeShip(ship);
          generateCellImage(twoDimensionalCoords, dragElement);
          toggleDraggable(dragElement);
          console.log(game.player.gameboard.ships);
        } else {
          removeCellsColor();
        }
        toggleContinueButton();
      });

      boardRow.appendChild(boardCell);
    }
    board.appendChild(boardRow);
  }
}

(function renderAxisButton() {
  const axisButton = document.getElementById('shipAxisButton');
  axisButton.addEventListener('click', () => {
    const position = axisButton.getAttribute('data-position');
    if (position === 'x-axis') {
      axisButton.setAttribute('data-position', 'y-axis');
      axisButton.textContent = 'Y-Axis';
    } else if (position === 'y-axis') {
      axisButton.setAttribute('data-position', 'x-axis');
      axisButton.textContent = 'X-Axis';
    }
  });
})();

(function renderResetButton() {
  const resetButton = document.getElementById('placeShipPage__resetButton');

  resetButton.addEventListener('click', () => {
    const placedCell = Array.from(
      document.getElementsByClassName('boardCell--placed'),
    );
    const draggedImages = Array.from(
      document.getElementsByClassName('fleetContainer__shipImage--placed'),
    );
    placedCell.forEach((cell) => {
      cell.style.backgroundImage = 'none';
      cell.classList.remove('boardCell--placed');
    });
    game.player.gameboard.clearShip();
    draggedImages.forEach((shipImage) => {
      shipImage.setAttribute('draggable', 'true');
      shipImage.classList.remove('fleetContainer__shipImage--placed');
      shipImage.classList.add('fleetContainer__shipImage--loaded');
    });
    toggleContinueButton();
  });
})();

(function renderContinueButton() {
  const continueButton = document.getElementById(
    'placeShipPage__continueButton',
  );
  const placeShipContainer = document.getElementById('placeShipContainer');
  const placeShipPage = document.getElementById('placeShipPage');
  const mainGameContainer = document.getElementById('mainGameContainer');
  const playerGameboard = document.getElementById('playerGameboard');
  const botGameboard = document.getElementById('botGameboard');
  const playerTextBox = document.getElementById('playerTextBox');
  const botTextBox = document.getElementById('botTextBox');
  continueButton.addEventListener('click', () => {
    if (
      continueButton.classList.contains('placeShipPage__continueButton--valid')
    ) {
      placeShipContainer.classList.remove('placeShipContainer--visible');
      placeShipContainer.classList.add('placeShipContainer');
      placeShipPage.classList.remove('placeShipPage--slideDown');
      placeShipPage.classList.add('placeShipPage');
      mainGameContainer.classList.add('mainGameContainer--visible');
      playerGameboard.classList.remove('boardContainer__gameBoard');
      playerGameboard.classList.add(
        `boardContainer__gameBoard--${game.player.char.characterName}`,
      );
      botGameboard.classList.add(
        `boardContainer__gameBoard--${game.bot.char.characterName}`,
      );
      botGameboard.classList.remove('boardContainer__gameBoard');
      playerTextBox.classList.remove('mainGamePage__textBox');
      playerTextBox.classList.add(
        `mainGamePage__textBox--${game.player.char.characterName}`,
      );
      botTextBox.classList.remove('mainGamePage__textBox');
      botTextBox.classList.add(
        `mainGamePage__textBox--${game.bot.char.characterName}`,
      );

      game.turn = null
      renderAttackingPlayer()
      generateOpponentGameboard();
      addPlayerShipNames()
      console.log(game.player)
      renderPlayerBoard()
      renderPlayerCellImage();
      renderBotBoard()
      generateBattleEntranceVoiceLines().then(() => {
        game.turn = 'player';
        renderAttackingPlayer();
      });
      // renderBotCellImage()
    }
  });
})();

(function renderReshuffleButton() {
  reshuffleImages();

})();

renderBoardCell('placeShipBoard');

export default reshuffleImages