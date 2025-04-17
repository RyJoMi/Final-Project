const chordLibrary = {
  maj7: [1, 1.25, 1.5, 1.875],
  dom7: [1, 1.25, 1.5, 1.8],
  min7: [1, 1.2, 1.5, 1.8],
  min3: [1, 1.2, 1.5, 1.8],
  min6: [1, 1.2, 1.5, 1.8],
  min79: [1, 1.2, 1.5, 1.8],
};

const thisAudio = new AudioContext();

//gain node for chord 1
const gain1 = thisAudio.createGain();
gain1.connect(thisAudio.destination);
gain1.gain.value = 0.5;

//gain node for chord 2
const gain2 = thisAudio.createGain();
gain2.connect(thisAudio.destination);
gain2.gain.value = 0.5;

//dropdown for chord 1 quality
const dropdown = document.getElementById("chor1Qual");
let currentChord = null;
//root for chord 1
let root = 440;

let qualKeys = Object.keys(chordLibrary);

// qualKeys.forEach((qual) => {
//   dropdown.innerHTML += `<option value=${qual}>${qual}</option>`;
// });

for (let qual in chordLibrary) {
  dropdown.innerHTML += `<option value=${qual}>${qual}</option>`;
}

// let quality = [
//   root * `${document.getElementById("chor1Qual").value}`[0],
//   root * `${document.getElementById("chor1Qual").value}`[1],
//   root * `${document.getElementById("chor1Qual").value}`[2],
//   root * `${document.getElementById("chor1Qual").value}`[3],
// ];

// dropdown.addEventListener("click", (event) => {
//   let newQual = event.target.value;
//   currentChord = chordLibrary[newQual];
// });

dropdown.addEventListener("change", (event) => {
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
    someOsc.connect(thisAudio.gain1);
    someOsc.start();
  });
};

let playBut = document.getElementById("play");

playBut.addEventListener("click", playChord1);
