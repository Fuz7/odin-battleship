export default class Gameboard{
  constructor(){
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship){
    this.ships.push(ship)
  }

  shipsSunk(){
    const shipsBool =this.ships.find((ship)=> ship.isSunk() === false)
    
    // if there is a ship that is not sunked
    if(shipsBool !== undefined){
      return false
    }
    return true
  }
} 