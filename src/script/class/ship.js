export default class Ship{
  constructor(lenght,coord){
    this.lenght = lenght;
    this.coord = coord;
    this.alignment = 'vertical';
    this.life = lenght;
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

