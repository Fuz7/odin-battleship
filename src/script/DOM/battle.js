/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
import Ship from '../class/ship';
import convertCorrespondingAngle from '../utils/angle';
import generateRandomPosition from '../utils/random';
import { game } from './charSel';
import '../utils/images';
import {
  attackPlayerBoard,
  delayThenClearText,
  renderAttackingPlayer,
} from '../utils/attack';
import Player from '../class/player';
import { generateTextAnimation } from '../utils/voiceLines';
import { randomizeArray } from '../utils/array';

(function renderPlayerBoard() {
  const playerBoard = document.getElementById('playerGameboard');
  for (let i = 9; i >= 0; i -= 1) {
    const boardRow = document.createElement('div');
    boardRow.classList.add('playerGameboard__boardRow');
    for (let j = 0; j <= 9; j += 1) {
      const boardCell = document.createElement('div');
      boardCell.classList.add('playerGameboard__boardCell');
      boardCell.setAttribute('data-cell', j);
      boardCell.setAttribute('data-row', i);

      boardRow.append(boardCell);
    }
    playerBoard.append(boardRow);
  }
})();

function renderBotBoard() {
  const botBoard = document.getElementById('botGameboard');

  botBoard.innerHTML = '';
  for (let i = 9; i >= 0; i -= 1) {
    const boardRow = document.createElement('div');
    boardRow.classList.add('botGameboard__boardRow');
    for (let j = 0; j <= 9; j += 1) {
      const boardCell = document.createElement('div');
      boardCell.classList.add('botGameboard__boardCell');
      boardCell.setAttribute('data-cell', j);
      boardCell.setAttribute('data-row', i);

      boardCell.addEventListener('click', (e) => {
        if (
          e.target.classList.contains('boardCell--attacked') !== true &&
          game.state !== 'animating' &&
          game.turn === 'player'
        ) {
          let topPos;
          let leftPos;
          game.state = 'animating';
          const spanElement = document.createElement('span');
          do {
            topPos = generateRandomPosition();
            leftPos = generateRandomPosition();
          } while (Math.abs(topPos) <= 50 && Math.abs(leftPos <= 50));
          const angle = convertCorrespondingAngle(topPos, leftPos);
          e.target.classList.add('animating');

          boardCell.append(spanElement);
          const attackSoundEffect =
            game.player.char.voice.attacks[Math.floor(Math.random() * 4)];
          spanElement.style.transform = `rotate(${angle}deg)`;
          spanElement.style.top = topPos + 'px';
          spanElement.style.left = leftPos + 'px';

          if (game.sfx === true) attackSoundEffect.play();
          const xPos = parseInt(e.target.getAttribute('data-cell'), 10);
          const yPos = parseInt(e.target.getAttribute('data-row'), 10);
          const shipGotHit = game.player.hitBoard([xPos, yPos]);

          e.target.addEventListener('animationend', () => {
            e.target.classList.add('boardCell--attacked');
            spanElement.remove();
            game.state = '';

            if (game.bot.gameboard.shipsSunk() === true) {
              e.target.classList.add('boardCell__withImage');
              e.target.style.backgroundImage = `url('./assets/images/${shipGotHit.icon}`;
              if (game.sfx === true) game.player.char.voice.shipHit.play();
              game.turn = null; 
              const gameOverContainer =
                document.getElementById('gameOverContainer');
              const gameOverText = document.getElementById(
                'gameOverPanel__text',
              );
              delayThenClearText(500).then(() => {
                if (game.sfx === true) game.player.char.voice.win.play();
                generateTextAnimation(
                  'playerText',
                  game.player.char.message.victoryQuote,
                ).then(() => {
                  setTimeout(() => {
                    generateTextAnimation(
                      'botText',
                      game.bot.char.message.loseQuote,
                    ).then(() => {
                      delayThenClearText(4000).then(() => {
                        gameOverText.textContent = 'You Win';
                        gameOverContainer.classList.add('visible');
                      });
                    });
                  }, 2000);
                });
              });
            } else if (shipGotHit instanceof Ship) {
              e.target.classList.add('boardCell__withImage');
              e.target.style.backgroundImage = `url('./assets/images/${shipGotHit.icon}`;
              if (game.sfx === true) game.player.char.voice.shipHit.play();
              game.player.resetMissedAttackCounter()
            }else {
              if (game.sfx === true) game.player.char.voice.boardHit.play();
              game.turn = 'bot';
              renderAttackingPlayer();
              attackPlayerBoard();
            }
          });
        }
      });

      boardRow.append(boardCell);
    }
    botBoard.append(boardRow);
  }
}
function reshuffleImages(){
  const reshuffleButton = document.getElementById(
    'placeShipPage__reshuffleButton',
  );
  reshuffleButton.addEventListener('click', () => {
    const placedImages = Array.from(
      document.getElementsByClassName('fleetContainer__shipImage--placed'),
    );
    const loadedImages = Array.from(
      document.getElementsByClassName('fleetContainer__shipImage--loaded'),
    );

    const placedImagesArr = placedImages.map((element) => {
      const imageSrc = element.getAttribute('data-image');
      return imageSrc;
    });

    const arrWithoutPlacedImage = game.player.char.images.filter((image) => {
      if (placedImagesArr.includes(image)) return false;
      return true;
    });

    const randomizedWithoutPlacedImage = randomizeArray(arrWithoutPlacedImage);
  
    loadedImages.forEach((element, index) => {
      element.style.backgroundImage = `url('./assets/images/${randomizedWithoutPlacedImage[index]}')`;
      element.setAttribute('data-image', randomizedWithoutPlacedImage[index]);
    });
  })
}


function removePlacedShip() {
  const placedCell = Array.from(
    document.getElementsByClassName('boardCell--placed'),
  );
  const draggedImages = Array.from(
    document.getElementsByClassName('fleetContainer__shipImage--placed'),
  );
  placedCell.forEach((cell) => {
    // eslint-disable-next-line no-param-reassign
    cell.style.backgroundImage = 'none';
    cell.classList.remove('boardCell--placed');
  });
  game.player.gameboard.clearShip();
  draggedImages.forEach((shipImage) => {
    shipImage.setAttribute('draggable', 'true');
    shipImage.classList.remove('fleetContainer__shipImage--placed');
    shipImage.classList.add('fleetContainer__shipImage--loaded');
  });
  const continueButton = document.getElementById(
    'placeShipPage__continueButton',
  );
  continueButton.classList.remove('placeShipPage__continueButton--valid');
  continueButton.classList.add('placeShipPage__continueButton--invalid');
}

(function renderRestartButton() {
  const restartButton = document.getElementById('gameOverPanel__restartButton');
  const charSelContainer = document.getElementById('charSelContainer');
  const charSelPage = document.getElementById('charSelPage');
  const mainGameContainer = document.getElementById('mainGameContainer');
  const gameOverContainer = document.getElementById('gameOverContainer');
  const gameOverPanel = document.getElementById('gameOverPanel')
  const playerGameboard = document.getElementById('playerGameboard')
  const botGameboard = document.getElementById('botGameboard')
  const playerTextBox = document.getElementById('playerTextBox')
  const botTextBox = document.getElementById('botTextBox')
  const placeShipBoard = document.getElementById('placeShipBoard')
  restartButton.addEventListener('click', () => {
    charSelContainer.classList.remove('charSelContainer');
    charSelContainer.classList.add('charSelContainer--visible');
    mainGameContainer.classList.remove('mainGameContainer--visible');
    charSelPage.classList.remove('slideUp');
    gameOverContainer.classList.remove('visible');
    gameOverContainer.classList.add('gameOverContainer');
    game.player = new Player();
    game.bot = new Player();
    game.player.setOpponent(game.bot);
    game.bot.setOpponent(game.player);
    playerGameboard.className = ''
    botGameboard.className = ''
    playerTextBox.className = ''
    botTextBox.className = ''
    placeShipBoard.className = ''
    gameOverPanel.classList.remove('necoArc')
    gameOverPanel.classList.remove('necoChaos')
    removePlacedShip();
    reshuffleImages()
  });
})();
renderBotBoard();

export default renderBotBoard;
export {reshuffleImages}
