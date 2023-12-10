
import charSelAudioSrc from '../../assets/audio/charSel__necoChaos.mp3'

const necoChaos = {
  characterName: 'necoChaos',
  voice: {
    charSel :charSelAudioSrc
  },

  images:['iN1.jpg','iN2.jpg','iN3.jpg','iN4.jpg','iN5.jpg','iN6.jpg','iN7.jpg','iN8.jpg','iN9.jpg',
'iN10.jpg','iN11.jpg','iN12.jpg','iN13.jpg','iN14.jpg','iN15.jpg','iN16.jpg','iN17.jpg','iN18.jpg','iN19.jpg',
'iN20.jpg','iN21.jpg','iN22.jpg','iN23.jpg','iN24.jpg','iN25.jpg','iN26.jpg'
]


}


Object.keys(necoChaos.voice).forEach((key) =>{
  const audio = new Audio(necoChaos.voice[key])
  necoChaos.voice[key] = audio;
})

export default necoChaos