import necoArc from '../class/necoArc';
import necoChaos from '../class/necoChaos';
import Player from '../class/player';

export const player1 = new Player();
export const bot = new Player();

function renderPlaceShipContent(){
  const placeShipContainer = document.getElementById('placeShipContainer')
  const placeShipPage = document.getElementById('placeShipPage')
  placeShipContainer.classList.remove(placeShipContainer.id)
  placeShipContainer.classList.add(`${placeShipContainer.id}--visible`)
  placeShipPage.classList.remove(placeShipPage.id)
  placeShipPage.classList.add(`${placeShipPage.id}--slideDown`)
}

function removeCharSelContainerVisibility(){
  const charSelContainer = document.getElementById('charSelContainer')
  charSelContainer.classList.remove(`${charSelContainer.id}--visible`)
  charSelContainer.classList.add(charSelContainer.id)
}

(function renderCharButtons() {
  player1.setOpponent(bot)
  bot.setOpponent(player1)
  let choose;
  const necoArcButton = document.getElementById('charSelPage__necoArc');
  const necoChaosButton = document.getElementById('charSelPage__necoChaos');
  const charSelPage = document.getElementById('charSelPage')
  necoArcButton.addEventListener('click', () => {
    if(choose !== true){

      necoArc.voice.charSel.play()
      player1.setCharacter(necoArc)
      bot.setCharacter(necoChaos)
      choose = true
      charSelPage.classList.add('slideUp')
      charSelPage.addEventListener('animationend', ()=>{
        removeCharSelContainerVisibility()
        renderPlaceShipContent()
      })

      console.log(player1)
      console.log(bot)
    }
  });
  necoChaosButton.addEventListener('click', () => {
    if(choose !== true){
      necoChaos.voice.charSel.play()
      player1.setCharacter(necoChaos)
      bot.setCharacter(necoArc)
      choose = true
      charSelPage.classList.add('slideUp')
      charSelPage.addEventListener('animationend', ()=>{
        removeCharSelContainerVisibility()
        renderPlaceShipContent()
      })
      console.log(player1)
      console.log(player1)
      console.log(bot)
    }
  })
  
  

})();


