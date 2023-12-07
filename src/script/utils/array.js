function generateArrayCoordinates(lenght,position,axis){
  const twoDimensionalArray = []

  if(axis ==='x-axis'){
    for(let i = position[0];i < position[0] + lenght;i+= 1){
      twoDimensionalArray.push([i,position[1]])
    }
  }else if(axis === 'y-axis'){
    for(let j = position[1]; j > position[1] - lenght;j-= 1){
      twoDimensionalArray.push([position[0],j])
    }
  }
  return twoDimensionalArray;
}

export default generateArrayCoordinates;