/* eslint-disable prefer-template */
import convertCorrespondingAngle from '../utils/angle';
import generateRandomPosition from '../utils/random';

function generateTextAnimation(textBox,message){
  const textBoxElement = document.getElementById(textBox);
  const typeDelay = 20;
  let charIndex = 0;
  textBoxElement.textContent = '';
  return new Promise((resolve)=>{

    function type(){
      if(charIndex < message.length){
        textBoxElement.textContent += message.charAt(charIndex)
        charIndex+= 1
        setTimeout(type,typeDelay)
      }else if(charIndex === message.length){
        resolve('doneTyping')
      }

    }
    type()
  })

}

(function renderPlayerBoard() {
  const playerBoard = document.getElementById('playerGameboard');
  for (let i = 9; i >= 0; i -= 1) {
    const boardRow = document.createElement('div');
    boardRow.classList.add('playerGameboard__boardRow');
    for (let j = 0; j <= 9; j += 1) {
      const boardCell = document.createElement('div');
      boardCell.classList.add('playerGameboard__boardCell');
      boardCell.setAttribute('data-cell', j);
      boardCell.setAttribute('data-row', i);

      boardRow.append(boardCell);
    }
    playerBoard.append(boardRow);
  }
})();

(function renderBotBoard() {
  const botBoard = document.getElementById('botGameboard');

  for (let i = 9; i >= 0; i -= 1) {
    const boardRow = document.createElement('div');
    boardRow.classList.add('botGameboard__boardRow');
    for (let j = 0; j <= 9; j += 1) {
      const boardCell = document.createElement('div');
      boardCell.classList.add('botGameboard__boardCell');
      boardCell.setAttribute('data-cell', j);
      boardCell.setAttribute('data-row', i);

      boardCell.addEventListener('click', (e) => {
        if(e.target.classList.contains('boardCell--attacked') !== true){        
        let topPos; 
        let leftPos;
        const spanElement = document.createElement('span');
        do {
          topPos = generateRandomPosition();
          leftPos = generateRandomPosition();
        } while (Math.abs(topPos) <= 50 && Math.abs(leftPos <= 50));
        const angle = convertCorrespondingAngle(topPos, leftPos);
        e.target.classList.add('animating');
        generateTextAnimation('botText','mGandasdasdsa dasdlask asd').then(()=>{
          console.log('done')
        })
        boardCell.append(spanElement);
        spanElement.style.transform = `rotate(${angle}deg)`;
        spanElement.style.top = topPos + 'px';
        spanElement.style.left = leftPos + 'px';

        e.target.addEventListener('animationend', () => {
          e.target.classList.add('boardCell--attacked');
          spanElement.remove();
        });
      }
      });

      boardRow.append(boardCell);
    }
    botBoard.append(boardRow);
  }
})();
