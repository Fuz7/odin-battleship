import necoArc from '../class/necoArc';
import necoChaos from '../class/necoChaos';

(function renderCharButtons() {
  const necoArcButton = document.getElementById('charSelPage__necoArc');
  const necoChaosButton = document.getElementById('charSelPage__necoChaos')
  necoArcButton.addEventListener('click', () => necoArc.voice.charSel.play());
  necoChaosButton.addEventListener('click', () => necoChaos.voice.charSel.play())
})();
