export default function renderVisibility(){
  if(this.classList.contains(`${this.id}--visible`)){
    this.classList.remove(`${this.id}--visible`)
    this.classList.add(this.id)
    
  }else if(this.classList.contains(this.id)){
    this.classList.remove(this.id)
    this.classList.add(`${this.id}--visible`)
  }

}

function toggleMusic(){
  const backgroundMusic = document.getElementById('backgroundMusic')
  const musicButton = document.getElementById('musicButton')
  if(musicButton.classList.contains('musicButton--on')){
    backgroundMusic.muted = false
  }else if(musicButton.classList.contains('musicButton--off')){
    backgroundMusic.muted = true
  }
}


function toggleButton() {
  if (this.classList.contains(`${this.id}--on`)) {
    this.classList.remove(`${this.id}--on`);
    this.classList.add(`${this.id}--off`);
  } else if (this.classList.contains(`${this.id}--off`)) {
    this.classList.remove(`${this.id}--off`);
    this.classList.add(`${this.id}--on`);
  }
}

(function renderSoundButtons() {
  const sfxButton = document.getElementById('sfxButton');
  const musicButton = document.getElementById('musicButton');
  sfxButton.addEventListener('click', toggleButton);
  musicButton.addEventListener('click', toggleButton);
  musicButton.addEventListener('click',toggleMusic)
})();




(function renderSettingButton(){
  const name = 'settingsContainer'
  const settingsButton = document.getElementById('settingsButton')
  const settingsContainer = document.getElementById(name)

  settingsButton.addEventListener('click',renderVisibility.bind(settingsContainer))
})();

(function renderSettingCloseButton(){
  const closeButton = document.getElementById('settingsPage__closeButton');
  const settingsContainer = document.getElementById('settingsContainer');

  closeButton.addEventListener('click',renderVisibility.bind(settingsContainer))
})();

