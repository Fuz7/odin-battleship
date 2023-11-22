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
})();


(function renderSettingButton(){
  const name = 'settingsContainer'
  const settingsButton = document.getElementById('settingsButton')
  const settingsContainer =document.getElementById(name)

  settingsButton.addEventListener('click',()=>{
    if(settingsContainer.classList.contains(name)){
      settingsContainer.classList.remove(name)
      settingsContainer.classList.add(`${name}--visible`)
    }else{
      settingsContainer.classList.remove(`${name}--visible`)
      settingsContainer.classList.add(name)
  
    }
  })
})();

(function renderSettingCloseButton(){
  const closeButton = document.getElementById('settingsPage__closeButton');
  const settingsContainer = document.getElementById('settingsContainer');

  closeButton.addEventListener('click',()=>{
    settingsContainer.classList.remove('settingsContainer--visible')
    settingsContainer.classList.add('settingsContainer')
  })
})();