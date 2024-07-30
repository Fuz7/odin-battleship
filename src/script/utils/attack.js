import { game } from '../DOM/charSel';
import generateRandomPosition from './random';


function attackRandomly() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  if (game.bot.checkHitValidity(x, y) === true) {
    const attackedShip = game.bot.hitBoard(x, y);
    if (attackedShip instanceof Object) {
      game.bot.hitState = 'attacked';
      game.bot.recentlyHitShip = attackedShip;
    }else if(attackedShip === null){
      game.turn = 'player'
    }

  } else if (game.bot.checkHitValidity(x, y) !== true) {
    return attackRandomly();
  }
  return [x,y];
}

function generateAdjacentAttack(coord) {
  return coord;
}

export { attackRandomly, generateAdjacentAttack };
