import necoArc from '../class/necoArc';
import necoChaos from '../class/necoChaos';
import Player from '../class/player';
import { randomizeArray } from '../utils/array';
import { placeShipObject } from '../class/ship';
<<<<<<< Updated upstream
=======
import Game from '../class/game';
>>>>>>> Stashed changes

// eslint-disable-next-line import/prefer-default-export
export const game = new Game()
const player1 = new Player();
const bot = new Player();
game.player = player1
game.bot = bot;


function renderFleetImage() {
  const selectedChar = document.getElementById('placeShipContainer').getAttribute('data-char')
  let character;
  if(selectedChar === 'necoChaos') character = necoChaos
  else if(selectedChar === 'necoArc') character = necoArc
  const shuffledImage = randomizeArray(character.images)

  const fleetImages = Array.from(document.getElementsByClassName('fleetContainer__shipImage'))
  fleetImages.forEach((element,index)=>{
    // eslint-disable-next-line no-param-reassign
    element.style.backgroundImage = `url('./assets/images/${shuffledImage[index]}')`;
    element.classList.remove('fleetContainer__shipImage')
    element.classList.add('fleetContainer__shipImage--loaded')
    element.setAttribute('draggable','true')
    element.setAttribute('data-image',shuffledImage[index])
    element.setAttribute('id',`placeShipImage${5 - index}`)

    element.addEventListener('dragstart',(ev)=>{
      placeShipObject.id = ev.target.id
    })



  })


}


function renderFleetImage() {
  const selectedChar = document.getElementById('placeShipContainer').getAttribute('data-char')
  let character;
  if(selectedChar === 'necoChaos') character = necoChaos
  else if(selectedChar === 'necoArc') character = necoArc
  const shuffledImage = randomizeArray(character.images)

  const fleetImages = Array.from(document.getElementsByClassName('fleetContainer__shipImage'))
  fleetImages.forEach((element,index)=>{
    // eslint-disable-next-line no-param-reassign
    element.style.backgroundImage = `url('./assets/images/${shuffledImage[index]}')`;
    element.classList.remove('fleetContainer__shipImage')
    element.classList.add('fleetContainer__shipImage--loaded')
    element.setAttribute('draggable','true')
    element.setAttribute('data-image',shuffledImage[index])
    element.setAttribute('id',`placeShipImage${5 - index}`)

    element.addEventListener('dragstart',(ev)=>{
      placeShipObject.id = ev.target.id
    })



  })


}

function renderPlaceShipContent(){
  const placeShipContainer = document.getElementById('placeShipContainer')
  const placeShipPage = document.getElementById('placeShipPage')
  const placeShipBoard = document.getElementById('placeShipBoard')
  placeShipBoard.classList.remove('placeShipBoard')
<<<<<<< Updated upstream
  placeShipBoard.classList.add(`placeShipBoard--${player1.char.characterName}`)
  placeShipContainer.setAttribute('data-char',player1.char.characterName)
=======
  placeShipBoard.classList.add(`placeShipBoard--${game.player.char.characterName}`)
  placeShipContainer.setAttribute('data-char',game.player.char.characterName)
>>>>>>> Stashed changes
  renderFleetImage()
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
  game.player.setOpponent(game.bot)
  game.bot.setOpponent(game.player)
  let choose;
  const necoArcButton = document.getElementById('charSelPage__necoArc');
  const necoChaosButton = document.getElementById('charSelPage__necoChaos');
  const charSelPage = document.getElementById('charSelPage')
  necoArcButton.addEventListener('click', () => {
    if(choose !== true){

      necoArc.voice.charSel.play()
      game.player.setCharacter(necoArc)
      game.bot.setCharacter(necoChaos)
      choose = true
      charSelPage.classList.add('slideUp')
      charSelPage.addEventListener('animationend', ()=>{
        removeCharSelContainerVisibility()
        renderPlaceShipContent()
      })

      console.log(game.player)
      console.log(game.bot)
    }
  });
  necoChaosButton.addEventListener('click', () => {
    if(choose !== true){
      necoChaos.voice.charSel.play()
      game.player.setCharacter(necoChaos)
      game.bot.setCharacter(necoArc)
      choose = true
      charSelPage.classList.add('slideUp')
      charSelPage.addEventListener('animationend', ()=>{
        removeCharSelContainerVisibility()
        renderPlaceShipContent()
      })
      console.log(game.player)
      console.log(game.bot)
    }
  })
  
  

})();


