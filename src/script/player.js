import Gameboard from './gameboard';

export default class Player {
  constructor(char) {
    this.char = char;
    this.gameboard = new Gameboard();
    this.opponent = null;
  }

  setOpponent(opponent) {
    this.opponent = opponent;
  }

  hitBoard(coordinate) {
    const { ships } = this.opponent.gameboard;
    let hitBool = false;
    ships.forEach((ship) => {
      const shipCoordMark = ship.coord.find(
        (currCorrdinate) => currCorrdinate[0] === coordinate[0] && currCorrdinate[1] === coordinate[1],
      );
      if(shipCoordMark !== undefined){
        hitBool = ship.hit()
      }
    })
    if(hitBool === false){
      this.gameboard.missedAttacks.push(coordinate)
    }
    ;
  }
}
