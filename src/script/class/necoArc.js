import charSelAudioSrc from '../../assets/audio/charSel__necoArc.mp3'
import arcAttack1 from '../../assets/audio/arcAttack1.mp3'
import arcAttack2 from '../../assets/audio/arcAttack2.mp3'
import arcAttack3 from '../../assets/audio/arcAttack3.mp3'
import arcAttack4 from '../../assets/audio/arcAttack4.mp3'
import arcEntrance from '../../assets/audio/arcEntrance.mp3'
import arcTaunt from '../../assets/audio/arcTaunt.mp3'
import arcShipDestoryed from '../../assets/audio/arcShipDestroyed.mp3'
import shipHits from '../../assets/audio/shipHit.mp3'
import boardHits from '../../assets/audio/boardHit.mp3'

const necoArc = {
  characterName : 'necoArc',
  voice: {
    entrance: arcEntrance,
    charSel :charSelAudioSrc,
    attacks: [arcAttack1,arcAttack2,arcAttack3,arcAttack4],
    taunt: arcTaunt,
    shipDestroyed: arcShipDestoryed,
    shipHit: shipHits,
    boardHit: boardHits,
  },
  
  images:['iNA1.jpg','iNA2.jpg','iNA3.jpg','iNA4.jpg','iNA5.jpg','iNA6.jpg','iNA7.jpg','iNA8.jpg','iNA9.jpg',
'iNA10.jpg','iNA11.jpg','iNA12.jpg','iNA13.jpg','iNA14.jpg','iNA15.jpg','iNA16.jpg','iNA17.jpg','iNA18.jpg','iNA19.jpg',
'iNA20.jpg','iNA21.jpg','iNA22.jpg','iNA23.jpg','iNA24.jpg','iNA25.jpg','iNA26.jpg'
]

}


Object.keys(necoArc.voice).forEach((key) =>{
  if(key === 'attacks'){
    const attacks = key
    necoArc.voice[attacks].forEach((attack,index) => {
      const audio = new Audio(necoArc.voice[attack])
      necoArc.voice[attacks][index] = audio
    });
  }else{
    const audio = new Audio(necoArc.voice[key])
    necoArc.voice[key] = audio;
  }
})

export default necoArc