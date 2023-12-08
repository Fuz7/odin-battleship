export default class Ship{
  constructor(lenght,coord){
    this.lenght = lenght;
    this.coord = coord;
    this.life = lenght;
    this.icon = null;

  }

  hit(){
    this.life -= 1;
    return true
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