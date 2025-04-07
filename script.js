const chordLibrary = {
  maj7: [1, 1.25, 1.5, 1.875],
  dom7: [1, 1.25, 1.5, 1.8],
  min7: [1, 1.2, 1.5, 1.8],
  min3: [1, 1.2, 1.5, 1.8],
  min6: [1, 1.2, 1.5, 1.8],
  min79: [1, 1.2, 1.5, 1.8],
};

const thisAudio = new AudioContext();

const dropdown = document.getElementById("chor1Qual");
let currentChord = null;
let root = 440;

let qualKeys = Object.keys(chordLibrary);

qualKeys.forEach((qual) => {
  dropdown.innerHTML += `<option value=${qual}>${qual}</option>`;
});

// let quality = [
//   root * `${document.getElementById("chor1Qual").value}`[0],
//   root * `${document.getElementById("chor1Qual").value}`[1],
//   root * `${document.getElementById("chor1Qual").value}`[2],
//   root * `${document.getElementById("chor1Qual").value}`[3],
// ];

dropdown.addEventListener("click", (event) => {
  let newQual = event.target.value;
  currentChord = chordLibrary[newQual];
});

const selectedIndex = dropdown.value;
let oscillators = [];
const playChord1 = function () {
  currentChord.forEach((e) => {
    oscillators.push(
      new OscillatorNode(thisAudio, { frequency: e * root, type: "triangle" })
    );
  });

  oscillators.forEach((someOsc) => {
    someOsc.connect(thisAudio.destination);
    someOsc.start();
  });

  //saves current time for reference
  // let now = thisAudio.currentTime;

  // //create osc
  // let myOsc1 = thisAudio.createOscillator();
  // let myOsc2 = thisAudio.createOscillator();
  // let myOsc3 = thisAudio.createOscillator();
  // let myOsc4 = thisAudio.createOscillator();

  // //frequencies
  // myOsc1.frequency.value = frequencyArray[selectedIndex][0];
  // myOsc2.frequency.value = frequencyArray[selectedIndex][1];
  // myOsc3.frequency.value = frequencyArray[selectedIndex][2];
  // myOsc4.frequency.value = frequencyArray[selectedIndex][3];
  // //wave
  // myOsc1.type = "triangle";
  // myOsc2.type = "triangle";
  // myOsc3.type = "triangle";
  // myOsc4.type = "triangle";
  // //connect
  // myOsc1.connect(thisAudio.destination);
  // myOsc2.connect(thisAudio.destination);
  // myOsc3.connect(thisAudio.destination);
  // myOsc4.connect(thisAudio.destination);
  // //start
  // myOsc1.start();
  // myOsc2.start();
  // myOsc3.start();
  // myOsc4.start();
};

let playBut = document.getElementById("play");

playBut.addEventListener("click", playChord1);
