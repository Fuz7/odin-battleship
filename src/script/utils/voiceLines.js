import { game } from '../DOM/charSel';

function generateTextAnimation(textBox, message) {
  const textBoxElement = document.getElementById(textBox);
  const typeDelay = 20;
  let charIndex = 0;
  textBoxElement.textContent = '';
  return new Promise((resolve) => {
    function type() {
      if (charIndex < message.length) {
        textBoxElement.textContent += message.charAt(charIndex);
        charIndex += 1;
        setTimeout(type, typeDelay);
      } else if (charIndex === message.length) {
        resolve('doneTyping');
      }
    }
    type();
  });
}

function clearText() {
  generateTextAnimation('playerText', '...');
  generateTextAnimation('botText', '...');
}

async function generateBattleEntranceVoiceLines() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('500 millisecond has passed');
    }, 1000);
  });
  await game.player.char.voice.entrance.play();
  if (game.player.char.characterName === 'necoArc') {
    await generateTextAnimation(
      'playerText',
      'Ready to get clobbered, Neco Chaos?',
    );
  } else if (game.player.char.characterName === 'necoChaos') {
    await generateTextAnimation(
      'playerText',
      'Prepare to be ship-wrecked, Neco-Arc!',
    );
  }

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('1 second has passed');
    }, 1000);
  });
  await game.bot.char.voice.entrance.play();

  if (game.player.char.characterName === 'necoArc') {
    await generateTextAnimation(
      'botText',
      'Only if you can dodge my chaotic torpedoes, Neco-Arc!',
    );
  } else if (game.player.char.characterName === 'necoChaos') {
    await generateTextAnimation(
      'botText',
      'Not before I turn your fleet into fish food, Neco Chaos!',
    );
  }
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });

  const letsRock = document.getElementById('letsRock');
  letsRock.style.visibility = 'visible';

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });

  game.player.char.voice.letsRock.play();

  await new Promise((resolve) => {
    setTimeout(() => {
      letsRock.style.visibility = 'hidden';
      clearText();
      resolve('1 second has passed');
    }, 1100);
  });
}

function generateShipSunkLines(character, shipName) {
  const randomNum = Math.floor(Math.random() * 3);
  if (character.characterName === 'necoArc') {
    const voiceLines = [
      `Nyaa~! ${shipName}’s toast? You’ve really ruffled my fur now, Neco Chaos!`,
      `Nyaa~! My trusty ${shipName} is down? You’re in big trouble now, Neco Chaos!`,
      `Nyaa~! Purr-fect ${shipName} is sunk? You’ve really made this kitty mad, Neco Chaos!`,
      `Nyaa~! ${shipName} bummed out  You’re pushing this cat to the edge, Neco Chaos!`,
    ];
    return voiceLines[randomNum];
  }
  if (character.characterName === 'necoChaos') {
    const voiceLines = [
      `Grr! ${shipName} is toast? You’ve just made me extra chaotic, Neco-Arc!`,
      `No way! ${shipName} is sunk? You’re in for a wild ride, Neco-Arc!`,
      `Argh! ${shipName} is down? You’ve unleashed the full chaos now, Neco-Arc!`,
      `Yikes! ${shipName} is out? Guess it’s time for some extra-chaotic mayhem!`,
    ];
    return voiceLines[randomNum]
  }
  return null
}

export {
  generateBattleEntranceVoiceLines,
  generateTextAnimation,
  clearText,
  generateShipSunkLines,
};
