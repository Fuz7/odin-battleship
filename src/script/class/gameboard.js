export default class Gameboard{
  constructor(){
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship){
    this.ships.push(ship)
  }

  
  checkValidity(coord){
    
    const valid = !(coord.find((pos) => {
      if(pos[0] < 0 || pos[0] > 9) return true
      if(pos[1] < 0 || pos[1] > 9) return true

      const ifShipHasSamePosition = this.ships.find((ship)=>{
          const coordBool = ship.coord.find((shipPos)=>{
            if(pos[0] === shipPos[0] && pos[1] === shipPos[1]) return true
            return false
          })
          return coordBool;
      })
      
      return ifShipHasSamePosition

    }));

    return valid
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