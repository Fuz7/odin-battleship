import Gameboard from './gameboard';

export default class Player {
  constructor() {
    this.char = null;
    this.gameboard = new Gameboard();
    this.opponent = null;
    this.hitState = null;
    this.recentlyHitShip = null;
    this.missedCounter = 0;
    this.missedTaunted = Math.floor(Math.random * 5 + 5)

  }

  setCharacter(char) {
    this.char = char;
  }

  setOpponent(opponent) {
    this.opponent = opponent;
  }

  resetMissedAttackCounter() {
    this.missedCounter = 0;
  }

  rerollMissedTaunted(){
    this.missedTaunted = Math.floor(Math.random * 5 + 5)
  }

  checkHitValidity(coordinate) {
    const { missedAttacks } = this.gameboard;
    const opponentShips = this.opponent.gameboard.ships;
    let shipGotHitBool = false;
    const existingCoord = !!missedAttacks.find(
      (missedCoord) =>
        missedCoord[0] === coordinate[0] && missedCoord[1] === coordinate[1],
    );


    shipGotHitBool = opponentShips.some((ship) => 
      ship.destroyed.some(
        (destroyedCoord) =>
          destroyedCoord[0] === coordinate[0] &&
          destroyedCoord[1] === coordinate[1],
      )
    );
    if (existingCoord === true || shipGotHitBool === true) {
      return false;
    }
    if(coordinate[0] < 0 || coordinate[0] > 9) return false
    if(coordinate[1] < 0 || coordinate[1] > 9) return false
    return true;
  }

  hitBoard(coordinate) {
    const { ships } = this.opponent.gameboard;
    let shipGotHit = null;
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
    if (shipGotHit === null) {
      this.gameboard.missedAttacks.push(coordinate);
    }
    return shipGotHit;
  }
}
