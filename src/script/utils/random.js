import { game } from '../DOM/charSel';
import Ship from '../class/ship';
import generateArrayCoordinates, { randomizeArray } from './array';

function generateRandomPosition() {
  const mathSign = Math.floor(Math.random() * 2);
  const numValue = Math.floor(Math.random() * 251);
  if (mathSign === 0) {
    return Math.abs(numValue);
  }
  if (mathSign === 1) {
    return -Math.abs(numValue);
  }
  return null;
}

function generateOpponentGameboard() {
  let shipLenght = 5;
  const axisArray = ['x-axis','y-axis']
  let x;
  let y;
  let axis;
  const randomizedImage = randomizeArray(game.bot.char.images)
  do {
    axis = axisArray[Math.floor(Math.random() * 2)];
    let randomCoords = []
    if (axis === 'x-axis') {
      x = Math.floor(Math.random() * (11 - shipLenght));
      y = Math.floor(Math.random() * 11);
    }else if(axis === 'y-axis'){
      x = Math.floor(Math.random() * 11)
      y = Math.floor(Math.random() * (11 - shipLenght))
    }

    randomCoords = generateArrayCoordinates(shipLenght,[x,y],axis);
    if(game.bot.gameboard.checkValidity(randomCoords) === true){
      const ship = new Ship(shipLenght,randomCoords)
      ship.icon = randomizedImage[shipLenght]
      game.bot.gameboard.placeShip(ship)
      shipLenght-= 1
    }
    console.log(game.bot.gameboard)
  } while (shipLenght > 0);
  
}

export {generateOpponentGameboard}
export default generateRandomPosition;
