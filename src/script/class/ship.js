export default class Ship{
  constructor(lenght,coord){
    this.lenght = lenght;
    this.coord = coord;
    this.life = lenght;
    this.destroyed = [];
    this.icon = null;

  }

  hit(shotCoord){
    this.destroyed.push(shotCoord)
    this.life -= 1;
    return this
  }

  isSunk(){
    if(this.life <= 0){
      return true
    }
    return false;
  }
}

const placeShipObject = {
  id: null,

}

export {placeShipObject}