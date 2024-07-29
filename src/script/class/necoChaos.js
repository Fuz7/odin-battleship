import charSelAudioSrc from '../../assets/audio/charSel__necoChaos.mp3'
import chaosAttack1 from '../../assets/audio/chaosAttack1.mp3'
import chaosAttack2 from '../../assets/audio/chaosAttack2.mp3'
import chaosAttack3 from '../../assets/audio/chaosAttack3.mp3'
import chaosAttack4 from '../../assets/audio/chaosAttack4.mp3'
import chaosEntrance from '../../assets/audio/chaosEntrance.mp3'
import chaosTaunt from '../../assets/audio/chaosTaunt.mp3'
import chaosShipDestoryed from '../../assets/audio/chaosShipDestroyed.mp3'
import shipHits from '../../assets/audio/shipHit.mp3'
import boardHits from '../../assets/audio/boardHit.mp3'


const necoChaos = {
  characterName: 'necoChaos',
  voice: {
    entrance: chaosEntrance,
    charSel :charSelAudioSrc,
    attacks: [chaosAttack1,chaosAttack2,chaosAttack3,chaosAttack4],
    taunt: chaosTaunt,
    shipDestroyed: chaosShipDestoryed,
    shipHit: shipHits,
    boardHit: boardHits,
  },

  images:['iN1.jpg','iN2.jpg','iN3.jpg','iN4.jpg','iN5.jpg','iN6.jpg','iN7.jpg','iN8.jpg','iN9.jpg',
'iN10.jpg','iN11.jpg','iN12.jpg','iN13.jpg','iN14.jpg','iN15.jpg','iN16.jpg','iN17.jpg','iN18.jpg','iN19.jpg',
'iN20.jpg','iN21.jpg','iN22.jpg','iN23.jpg','iN24.jpg','iN25.jpg','iN26.jpg'
],

  message:{
    userIntro:'Mwahaha! Prepare to be ship-wrecked, Neco-Arc!',
    enemyIntro:'Mwahaha! Only if you can dodge my chaotic torpedoes, Neco-Arc!',
  },

}


Object.keys(necoChaos.voice).forEach((key) =>{
  if(key === 'attacks'){

    const attacks = key
    necoChaos.voice[attacks].forEach((attack,index) => {
      const audio = new Audio(necoChaos.voice[attack])
      audio.src = attack
      necoChaos.voice.attacks[index] = audio });
  }else{
    const audio = new Audio(necoChaos.voice[key])
    necoChaos.voice[key] = audio;
  }
})

export default necoChaos