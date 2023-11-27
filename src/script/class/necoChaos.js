
import charSelAudioSrc from '../../assets/audio/charSel__necoChaos.mp3'

const necoChaos = {
  character: 'necoChaos',
  voice: {
    charSel :charSelAudioSrc
  }

}


Object.keys(necoChaos.voice).forEach((key) =>{
  const audio = new Audio(necoChaos.voice[key])
  necoChaos.voice[key] = audio;
})

export default necoChaos