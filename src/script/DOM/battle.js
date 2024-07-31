/* eslint-disable prefer-template */
import Ship from '../class/ship';
import convertCorrespondingAngle from '../utils/angle';
import generateRandomPosition from '../utils/random';
import { game } from './charSel';
import '../utils/images';
import { attackRandomly, renderAttackingPlayer } from '../utils/attack';

function generateTextAnimation(textBox, message) {
  const textBoxElement = document.getElementById(textBox);
  const typeDelay = 20;
  let charIndex = 0;
  textBoxElement.textContent = '';
  return new Promise((resolve) => {
    function type() {
      if (charIndex < message.length) {
        textBoxElement.textContent += message.charAt(charIndex);
        charIndex += 1;
        setTimeout(type, typeDelay);
      } else if (charIndex === message.length) {
        resolve('doneTyping');
      }
    }
    type();
  });
}

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



function attackPlayerBoard(){
  if(game.turn === 'bot' && game.bot.hitState === null && game.state !== 'animating'){
      attackRandomly()
  }
}

(function renderBotBoard() {
  const botBoard = document.getElementById('botGameboard');

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
          game.state !== 'animating'
          && game.turn === 'player'
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

          console.log(attackSoundEffect.played.length);
          attackSoundEffect.play();
          const xPos = parseInt(e.target.getAttribute('data-cell'), 10);
          const yPos = parseInt(e.target.getAttribute('data-row'), 10);
          const shipGotHit = game.player.hitBoard([xPos, yPos]);

          e.target.addEventListener('animationend', () => {
            e.target.classList.add('boardCell--attacked');
            spanElement.remove();
            game.state = '';
            if (shipGotHit instanceof Ship) {
              e.target.classList.add('boardCell__withImage')
              e.target.style.backgroundImage = `url('./assets/images/${shipGotHit.icon}`
              game.player.char.voice.shipHit.play();
            } else {
              game.player.char.voice.boardHit.play();
              game.turn = 'bot'
              renderAttackingPlayer();
              attackPlayerBoard()
            }
          });
        }
      });

      boardRow.append(boardCell);
    }
    botBoard.append(boardRow);
  }
})();



export{generateTextAnimation} ;
