import charSelAudioSrc from '../../assets/audio/charSel__necoArc.mp3'

const necoArc = {

  voice: {
    charSel :charSelAudioSrc
  }

}


Object.keys(necoArc.voice).forEach((key) =>{
  const audio = new Audio(necoArc.voice[key])
  necoArc.voice[key] = audio;
})

export default necoArc