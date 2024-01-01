import Gameboard from './gameboard';

export default class Player {
  constructor() {
    this.char = null;
    this.gameboard = new Gameboard();
    this.opponent = null;

  }

  setCharacter(char){
    this.char = char
  }

  setOpponent(opponent) {
    this.opponent = opponent;
  }

  hitBoard(coordinate) {
    const { ships } = this.opponent.gameboard;
    let shipGotHit = false;
    ships.forEach((ship) => {
      const shipCoordMark = ship.coord.find(
        (currCorrdinate) =>
          currCorrdinate[0] === coordinate[0] &&
          currCorrdinate[1] === coordinate[1],
      );
      if (shipCoordMark !== undefined) {
        
        shipGotHit = ship.hit(shipCoordMark);
      }
    });
    if (shipGotHit === false) {
      this.gameboard.missedAttacks.push(coordinate);
    }
    return (shipGotHit)
  }
}

