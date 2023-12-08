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


function randomizeArray(array){
    const arrayCopy = array.slice()
  
 for (let i = arrayCopy.length - 1; i > 0; i-= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = temp;
    }
    return arrayCopy
}

export default generateArrayCoordinates;
export {randomizeArray}