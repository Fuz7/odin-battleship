function convertCorrespondingAngle(y,x){
  return (Math.atan2(y,x) * 180 / Math.PI) + 180;
}

export default convertCorrespondingAngle