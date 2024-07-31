import { game } from '../DOM/charSel';
import convertCorrespondingAngle from './angle';
import generateRandomPosition from './random';
import { clearText, generateShipSunkLines, generateTextAnimation } from './voiceLines';

function renderAttackingPlayer(){
  const playerTextbox = document.getElementById('playerTextBox');
  const botTextBox = document.getElementById('botTextBox')
  if(game.turn === 'player'){
    playerTextbox.classList.add('attacking')
    botTextBox.classList.remove('attacking')
  }else if(game.turn ==='bot'){
    botTextBox.classList.add('attacking')
    playerTextbox.classList.remove('attacking')
  }else{
    playerTextbox.classList.remove('attacking')
    botTextBox.classList.remove('attacking')

  }
}

function delayThenClearText(millisecond){
  return new Promise((resolve)=>{
    setTimeout(() => {
      clearText()
      resolve()
    }, millisecond);
  })
}

function attackRandomly() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  if (game.bot.checkHitValidity([x, y]) === true) {
    const attackedShip = game.bot.hitBoard([x, y]);
    console.log(attackedShip?? 'its Null')
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

    attackSoundEffect.play();
    boardCell.addEventListener('animationend',()=>{
      boardCell.classList.add('boardCell--attacked')
      spanElement.remove();
      game.state = '';
      if(attackedShip === null){
        game.player.char.voice.boardHit.play()
        game.turn = 'player';
        renderAttackingPlayer()
        
      }
      else if (attackedShip.isSunk() === true) {
        game.bot.hitState = null;
        game.bot.recentlyHitShip = null;
        boardCell.classList.add('boardCell__withImage')
        boardCell.style.backgroundImage = `url('./assets/images/${attackedShip.icon}`
        game.player.char.voice.shipHit.play()
        renderAttackingPlayer()
        const sunkShipLine = generateShipSunkLines(game.player.char,attackedShip.shipName)
        generateTextAnimation('playerText',sunkShipLine).then(()=>{
          delayThenClearText(1500).then(()=>{
              setTimeout(() => {
                attackRandomly()
              }, 1500);
          })
        })
        
      
    } else if (attackedShip instanceof Object) {
      game.bot.hitState = null;
      game.bot.recentlyHitShip = attackedShip;
      boardCell.classList.add('boardCell__withImage')
      boardCell.style.backgroundImage = `url('./assets/images/${attackedShip.icon}`
      game.player.char.voice.shipHit.play()
      renderAttackingPlayer()
      setTimeout(() => {
      attackRandomly()
        
      }, 400);
    }

    })
    
  } else if (game.bot.checkHitValidity([x, y]) !== true) {
    console.log('hell Nah')
    attackRandomly();
  }
  return [x, y];
}

function generateAdjacentAttack(coord) {
  return coord;
}

export { renderAttackingPlayer,attackRandomly, generateAdjacentAttack, };
