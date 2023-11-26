
import myAudio from '../../assets/audio/background-music.mp3';

const audio = new Audio(myAudio);


document.addEventListener('mouseover',()=>{
  if(audio.played.length === 0){
    audio.muted = false
      audio.play().then(() => {
        // Playback successful
      })
      .catch(() => {
        // Handle playback error
        console.error = function nothing(){}
      });
    }
  })
    


audio.addEventListener('playing',()=>{
  const body = document.getElementById('body')
  audio.setAttribute('loop','')
  audio.setAttribute('id','backgroundMusic')
  body.appendChild(audio)
})

audio.addEventListener('error', (event) => {
  console.error('Error loading audio:', event);
});
