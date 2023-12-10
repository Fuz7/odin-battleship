import charSelAudioSrc from '../../assets/audio/charSel__necoArc.mp3'

const necoArc = {
  characterName : 'necoArc',
  voice: {
    charSel :charSelAudioSrc,
  },
  
  images:['iNA1.jpg','iNA2.jpg','iNA3.jpg','iNA4.jpg','iNA5.jpg','iNA6.jpg','iNA7.jpg','iNA8.jpg','iNA9.jpg',
'iNA10.jpg','iNA11.jpg','iNA12.jpg','iNA13.jpg','iNA14.jpg','iNA15.jpg','iNA16.jpg','iNA17.jpg','iNA18.jpg','iNA19.jpg',
'iNA20.jpg','iNA21.jpg','iNA22.jpg','iNA23.jpg','iNA24.jpg','iNA25.jpg','iNA26.jpg'
]

}


Object.keys(necoArc.voice).forEach((key) =>{
  const audio = new Audio(necoArc.voice[key])
  necoArc.voice[key] = audio;
})

export default necoArc