/* eslint-disable no-use-before-define */
import { game } from '../DOM/charSel';
import convertCorrespondingAngle from './angle';
import generateRandomPosition from './random';
import {
  clearText,
  generateShipSunkLines,
  generateTextAnimation,
} from './voiceLines';

function delayThenClearText(millisecond) {
  return new Promise((resolve) => {
    setTimeout(() => {
      clearText();
      resolve();
    }, millisecond);
  });
}

function renderAttackingPlayer() {
  const playerTextbox = document.getElementById('playerTextBox');
  const botTextBox = document.getElementById('botTextBox');
  if (game.turn === 'player') {
    playerTextbox.classList.add('attacking');
    botTextBox.classList.remove('attacking');
  } else if (game.turn === 'bot') {
    botTextBox.classList.add('attacking');
    playerTextbox.classList.remove('attacking');
  } else {
    playerTextbox.classList.remove('attacking');
    botTextBox.classList.remove('attacking');
  }
}

function attackRandomly() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  if (game.bot.checkHitValidity([x, y]) === true) {
    const attackedShip = game.bot.hitBoard([x, y]);
    console.log(attackedShip ?? 'its Null');
    const boardCell = document.querySelector(
      `.playerGameboard__boardCell[data-cell="${x}"][data-row="${y}"]`,
    );
    let topPos;
    let leftPos;
    game.state = 'animating';
    const spanElement = document.createElement('span');
    do {
      topPos = generateRandomPosition();
      leftPos = generateRandomPosition();
    } while (Math.abs(topPos) <= 50 && Math.abs(leftPos <= 50));
    const angle = convertCorrespondingAngle(topPos, leftPos);
    boardCell.classList.add('animating');

    boardCell.append(spanElement);
    const attackSoundEffect =
      game.bot.char.voice.attacks[Math.floor(Math.random() * 4)];
    spanElement.style.transform = `rotate(${angle}deg)`;
    spanElement.style.top = `${topPos}px`;
    spanElement.style.left = `${leftPos}px`;

    if(game.sfx === true)attackSoundEffect.play();
    boardCell.addEventListener('animationend', () => {
      boardCell.classList.add('boardCell--attacked');
      spanElement.remove();
      game.state = '';
      if (attackedShip === null) {
        if(game.sfx === true)game.player.char.voice.boardHit.play();
        game.turn = 'player';
        renderAttackingPlayer();
      }else if(game.player.gameboard.shipsSunk()=== true){
        const gameOverContainer = document.getElementById('gameOverContainer')
        const gameOverText = document.getElementById('gameOverPanel__text')
        delayThenClearText(1000).then(()=>{
          if(game.sfx === true)game.bot.char.voice.win.play()
          generateTextAnimation('botText',game.bot.char.message.victoryQuote).then(()=>{
            setTimeout(() => {
              generateTextAnimation('playerText',game.player.char.message.loseQuote).then(()=>{
                delayThenClearText(4000).then(()=>{
                  gameOverText.textContent = 'You Lose'
                  gameOverContainer.classList.add('visible')
                })
              })
            }, 2000);
          })
        })
      } 
      else if (attackedShip.isSunk() === true) {
        game.bot.hitState = null;
        game.bot.recentlyHitShip = null;
        boardCell.classList.add('boardCell__withImage');
        boardCell.style.backgroundImage = `url('./assets/images/${attackedShip.icon}`;
        if(game.sfx === true)game.player.char.voice.shipHit.play();
        renderAttackingPlayer();
        const sunkShipLine = generateShipSunkLines(
          game.player.char,
          attackedShip.shipName,
        );
          if(game.sfx === true) game.player.char.voice.shipDestroyed.play()
        generateTextAnimation('playerText', sunkShipLine).then(() => {
          delayThenClearText(1500).then(() => {
            setTimeout(() => {
              attackPlayerBoard();
            }, 1500);
          });
        });
      } else if (attackedShip instanceof Object) {
        game.bot.hitState = 'attacking';
        game.bot.recentlyHitShip = attackedShip;
        boardCell.classList.add('boardCell__withImage');
        boardCell.style.backgroundImage = `url('./assets/images/${attackedShip.icon}`;
        if(game.sfx === true)game.player.char.voice.shipHit.play();
        renderAttackingPlayer();
        setTimeout(() => {
          attackPlayerBoard();
        }, 600);
      }
    });
  } else if (game.bot.checkHitValidity([x, y]) !== true) {
    console.log('hell Nah');
    attackPlayerBoard();
  }
}

function attackAdjacent() {
  const x = game.bot.recentlyHitShip.destroyed[0][0];
  const y = game.bot.recentlyHitShip.destroyed[0][1];
  const adjacentPositions = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  const randomNumber = Math.floor(Math.random() * 4);
  const chosenCoord = adjacentPositions[randomNumber];
  if (game.bot.checkHitValidity([chosenCoord[0], chosenCoord[1]]) === true) {
    const attackedShip = game.bot.hitBoard([chosenCoord[0], chosenCoord[1]]);
    const boardCell = document.querySelector(
      `.playerGameboard__boardCell[data-cell="${chosenCoord[0]}"][data-row="${chosenCoord[1]}"]`,
    );
    let topPos;
    let leftPos;
    game.state = 'animating';
    const spanElement = document.createElement('span');
    do {
      topPos = generateRandomPosition();
      leftPos = generateRandomPosition();
    } while (Math.abs(topPos) <= 50 && Math.abs(leftPos <= 50));
    const angle = convertCorrespondingAngle(topPos, leftPos);
    boardCell.classList.add('animating');

    boardCell.append(spanElement);
    const attackSoundEffect =
      game.bot.char.voice.attacks[Math.floor(Math.random() * 4)];
    spanElement.style.transform = `rotate(${angle}deg)`;
    spanElement.style.top = `${topPos}px`;
    spanElement.style.left = `${leftPos}px`;

    attackSoundEffect.play();
    boardCell.addEventListener('animationend', () => {
      boardCell.classList.add('boardCell--attacked');
      spanElement.remove();
      game.state = '';
      if (attackedShip === null) {
        game.player.char.voice.boardHit.play();
        game.turn = 'player';
        renderAttackingPlayer();
      }else if(game.player.gameboard.shipsSunk()=== true){
               const gameOverContainer = document.getElementById('gameOverContainer')
        const gameOverText = document.getElementById('gameOverPanel__text')
        delayThenClearText(1000).then(()=>{
          if(game.sfx === true)game.bot.char.voice.win.play()
          generateTextAnimation('botText',game.bot.char.message.victoryQuote).then(()=>{
            setTimeout(() => {
              generateTextAnimation('playerText',game.player.char.message.loseQuote).then(()=>{
                delayThenClearText(4000).then(()=>{
                  gameOverText.textContent = 'You Lose'
                  gameOverContainer.classList.add('visible')
                })
              })
            }, 2000);
          })
        }) 
      }  else if (attackedShip.isSunk() === true) {
        game.bot.hitState = null;
        game.bot.recentlyHitShip = null;
        boardCell.classList.add('boardCell__withImage');
        boardCell.style.backgroundImage = `url('./assets/images/${attackedShip.icon}`;
        game.player.char.voice.shipHit.play();
        renderAttackingPlayer();
        const sunkShipLine = generateShipSunkLines(
          game.player.char,
          attackedShip.shipName,
        );
        if(game.sfx === true) game.player.char.voice.shipDestroyed.play()
        generateTextAnimation('playerText', sunkShipLine).then(() => {
          delayThenClearText(1500).then(() => {
            setTimeout(() => {
              attackPlayerBoard();
            }, 1500);
          });
        });
      } else if (attackedShip instanceof Object) {
        game.bot.hitState = 'attacking';
        game.bot.recentlyHitShip = attackedShip;
        boardCell.classList.add('boardCell__withImage');
        boardCell.style.backgroundImage = `url('./assets/images/${attackedShip.icon}`;
        game.player.char.voice.shipHit.play();
        renderAttackingPlayer();
        setTimeout(() => {
          attackPlayerBoard();
        }, 600);
      }
    });
  } else if (
    game.bot.checkHitValidity([chosenCoord[0], chosenCoord[1]]) !== true
  ) {
    attackPlayerBoard();
  }
}

function attackInParallel() {
  const destroyedCoords = game.bot.recentlyHitShip.destroyed;
  if (destroyedCoords[0][0] - destroyedCoords[1][0] !== 0) {
    const sortedXArray = destroyedCoords.sort((a, b) => a[0] - b[0]);
    const leastValue = sortedXArray[0][0];
    const biggestValue = sortedXArray[sortedXArray.length - 1][0];
    const difference = biggestValue - leastValue;
    const possibleCoords = [
      [leastValue - 1, sortedXArray[0][1]],
      [biggestValue + 1, sortedXArray[sortedXArray.length - 1][1]],
    ];
    let randomNumber = Math.floor(Math.random() * 2);
    if(difference === 2){
      randomNumber = Math.floor(Math.random() * 3)
      possibleCoords.push([leastValue+1,sortedXArray[0][1]])
    }
    if(difference === 3){
      randomNumber = Math.floor(Math.random() * 4)
      possibleCoords.push([leastValue+1,sortedXArray[0][1]])
      possibleCoords.push([leastValue + 2,sortedXArray[0][0]])
    }
    const chosenCoord = possibleCoords[randomNumber];
    if (game.bot.checkHitValidity([chosenCoord[0], chosenCoord[1]]) === true) {
      const attackedShip = game.bot.hitBoard([chosenCoord[0], chosenCoord[1]]);
      const boardCell = document.querySelector(
        `.playerGameboard__boardCell[data-cell="${chosenCoord[0]}"][data-row="${chosenCoord[1]}"]`,
      );
      let topPos;
      let leftPos;
      game.state = 'animating';
      const spanElement = document.createElement('span');
      do {
        topPos = generateRandomPosition();
        leftPos = generateRandomPosition();
      } while (Math.abs(topPos) <= 50 && Math.abs(leftPos <= 50));
      const angle = convertCorrespondingAngle(topPos, leftPos);
      boardCell.classList.add('animating');

      boardCell.append(spanElement);
      const attackSoundEffect =
        game.bot.char.voice.attacks[Math.floor(Math.random() * 4)];
      spanElement.style.transform = `rotate(${angle}deg)`;
      spanElement.style.top = `${topPos}px`;
      spanElement.style.left = `${leftPos}px`;

      if(game.sfx === true)attackSoundEffect.play();
      boardCell.addEventListener('animationend', () => {
        boardCell.classList.add('boardCell--attacked');
        spanElement.remove();
        game.state = '';
        if (attackedShip === null) {
          game.player.char.voice.boardHit.play();
          game.turn = 'player';
          renderAttackingPlayer();
        }else if(game.player.gameboard.shipsSunk()=== true){
        const gameOverContainer = document.getElementById('gameOverContainer')
        const gameOverText = document.getElementById('gameOverPanel__text')
        delayThenClearText(1000).then(()=>{
          if(game.sfx === true)game.bot.char.voice.win.play()
          generateTextAnimation('botText',game.bot.char.message.victoryQuote).then(()=>{
            setTimeout(() => {
              generateTextAnimation('playerText',game.player.char.message.loseQuote).then(()=>{
                delayThenClearText(4000).then(()=>{
                  gameOverText.textContent = 'You Lose'
                  gameOverContainer.classList.add('visible')
                })
              })
            }, 2000);
          })
        })
        }  
        else if (attackedShip.isSunk() === true) {
          game.bot.hitState = null;
          game.bot.recentlyHitShip = null;
          boardCell.classList.add('boardCell__withImage');
          boardCell.style.backgroundImage = `url('./assets/images/${attackedShip.icon}`;
          if(game.sfx === true)game.player.char.voice.shipHit.play();
          
          renderAttackingPlayer();
          const sunkShipLine = generateShipSunkLines(
            game.player.char,
            attackedShip.shipName,
          );
          if(game.sfx === true) game.player.char.voice.shipDestroyed.play()
          generateTextAnimation('playerText', sunkShipLine).then(() => {

            delayThenClearText(1500).then(() => {
              setTimeout(() => {
                attackPlayerBoard();
              }, 1500);
            });
          });
        } else if (attackedShip instanceof Object) {
          game.bot.hitState = 'attacking';
          game.bot.recentlyHitShip = attackedShip;
          boardCell.classList.add('boardCell__withImage');
          boardCell.style.backgroundImage = `url('./assets/images/${attackedShip.icon}`;
          if(game.sfx === true)game.player.char.voice.shipHit.play();
          renderAttackingPlayer();
          setTimeout(() => {
            attackPlayerBoard();
          }, 600);
        }
      });
    } else if (
      game.bot.checkHitValidity([chosenCoord[0], chosenCoord[1]]) !== true
    ) {
      attackPlayerBoard();
    }
  } else if (destroyedCoords[0][1] - destroyedCoords[1][1] !== 0) {
    const sortedYArray = destroyedCoords.sort((a, b) => a[1] - b[1]);
    const leastValue = sortedYArray[0][1];
    const biggestValue = sortedYArray[sortedYArray.length - 1][1];
    const difference = biggestValue - leastValue;
     
    const possibleCoords = [
      [sortedYArray[0][0], leastValue - 1],
      [sortedYArray[sortedYArray.length - 1][0], biggestValue + 1],
    ];
    let randomNumber = Math.floor(Math.random() * 2);
    if(difference === 2){
      randomNumber = Math.floor(Math.random() * 3)
      possibleCoords.push([sortedYArray[0][0],leastValue+1])
    }
    if(difference === 3){
      randomNumber = Math.floor(Math.random() * 4)
      possibleCoords.push([sortedYArray[0][0],leastValue+1])
      possibleCoords.push([sortedYArray[0][0],leastValue + 2])
    }
    const chosenCoord = possibleCoords[randomNumber];
    if (game.bot.checkHitValidity([chosenCoord[0], chosenCoord[1]]) === true) {
      const attackedShip = game.bot.hitBoard([chosenCoord[0], chosenCoord[1]]);
      const boardCell = document.querySelector(
        `.playerGameboard__boardCell[data-cell="${chosenCoord[0]}"][data-row="${chosenCoord[1]}"]`,
      );
      let topPos;
      let leftPos;
      game.state = 'animating';
      const spanElement = document.createElement('span');
      do {
        topPos = generateRandomPosition();
        leftPos = generateRandomPosition();
      } while (Math.abs(topPos) <= 50 && Math.abs(leftPos <= 50));
      const angle = convertCorrespondingAngle(topPos, leftPos);
      boardCell.classList.add('animating');

      boardCell.append(spanElement);
      const attackSoundEffect =
        game.bot.char.voice.attacks[Math.floor(Math.random() * 4)];
      spanElement.style.transform = `rotate(${angle}deg)`;
      spanElement.style.top = `${topPos}px`;
      spanElement.style.left = `${leftPos}px`;

      if(game.sfx === true)attackSoundEffect.play();
      boardCell.addEventListener('animationend', () => {
        boardCell.classList.add('boardCell--attacked');
        spanElement.remove();
        game.state = '';
        if (attackedShip === null) {
          if(game.sfx === true)game.player.char.voice.boardHit.play();
          game.turn = 'player';
          renderAttackingPlayer();
        } else if (attackedShip.isSunk() === true) {
          game.bot.hitState = null;
          game.bot.recentlyHitShip = null;
          boardCell.classList.add('boardCell__withImage');
          boardCell.style.backgroundImage = `url('./assets/images/${attackedShip.icon}`;
          if(game.sfx === true)game.player.char.voice.shipHit.play();
          renderAttackingPlayer();
          const sunkShipLine = generateShipSunkLines(
            game.player.char,
            attackedShip.shipName,
          );
          generateTextAnimation('playerText', sunkShipLine).then(() => {
            delayThenClearText(1500).then(() => {
              setTimeout(() => {
                attackPlayerBoard();
              }, 1500);
            });
          });
        } else if (attackedShip instanceof Object) {
          game.bot.hitState = 'attacking';
          game.bot.recentlyHitShip = attackedShip;
          boardCell.classList.add('boardCell__withImage');
          boardCell.style.backgroundImage = `url('./assets/images/${attackedShip.icon}`;
          if(game.sfx === true)game.player.char.voice.shipHit.play();
          renderAttackingPlayer();
          setTimeout(() => {
            attackPlayerBoard();
          }, 600);
        }
      });
    } else if (
      game.bot.checkHitValidity([chosenCoord[0], chosenCoord[1]]) !== true
    ) {
      attackPlayerBoard();
    }
  }
}

function attackPlayerBoard() {
  if (
    game.turn === 'bot' &&
    game.state !== 'animating' &&
    game.bot.hitState == null
  ) {
    attackRandomly();
  } else if (
    game.turn === 'bot' &&
    game.state !== 'animating' &&
    game.bot.hitState === 'attacking' &&
    game.bot.recentlyHitShip.destroyed.length === 1
  ) {
    attackAdjacent();
  } else if (
    game.turn === 'bot' &&
    game.state !== 'animating' &&
    game.bot.hitState === 'attacking' &&
    game.bot.recentlyHitShip.destroyed.length > 1
  ) {
    attackInParallel();
  }
}

function generateAdjacentAttack(coord) {
  return coord;
}

export {
  renderAttackingPlayer,
  attackRandomly,
  generateAdjacentAttack,
  attackAdjacent,
  attackPlayerBoard,
};
