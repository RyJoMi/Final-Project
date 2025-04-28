const chordLibrary = {
  fifth: [1, 1.5],
  maj7: [1, 1.25, 1.5, 1.875],
  dom7: [1, 1.25, 1.5, 1.8],
  min7: [1, 1.2, 1.5, 1.8],
};

const thisAudio = new AudioContext();

//gain node for chord 1
const gain1 = thisAudio.createGain();
gain1.connect(thisAudio.destination);
gain1.gain.value = 0.125;

//gain node for chord 2
const gain2 = thisAudio.createGain();
gain2.connect(thisAudio.destination);
gain2.gain.value = 0.125;

//dropdown for chord 1 quality
const dropdown1 = document.getElementById("chor1Qual");
let currentChord1 = chordLibrary.fifth;
//root for chord 1
let root1 = 440;

//dropdown for chord 2 quality
const dropdown2 = document.getElementById("chor2Qual");
let currentChord2 = chordLibrary.fifth;
//root for chord 2
let root2 = 440;

//Dropdowns
let qualKeys = Object.keys(chordLibrary);

for (let qual in chordLibrary) {
  dropdown1.innerHTML += `<option value=${qual}>${qual}</option>`;
}

for (let qual in chordLibrary) {
  dropdown2.innerHTML += `<option value=${qual}>${qual}</option>`;
}

//dropdown for chord 1
dropdown1.addEventListener("change", (event) => {
  let newQual = event.target.value;
  currentChord1 = chordLibrary[newQual];
});

//dropdown for chord 2
dropdown2.addEventListener("change", (event) => {
  let newQual = event.target.value;
  currentChord2 = chordLibrary[newQual];
});

//-------------------Osc for chord 1--------------------
const selectedIndex1 = dropdown1.value;
let oscillators1 = [];
const playChord1 = function () {
  currentChord1.forEach((e) => {
    oscillators1.push(
      new OscillatorNode(thisAudio, { frequency: e * root1, type: "triangle" })
    );
  });

  oscillators1.forEach((someOsc1) => {
    someOsc1.connect(gain1);
    someOsc1.start();
  });
};

//-------------------Osc for chord 2--------------------
const selectedIndex2 = dropdown2.value;
let oscillators2 = [];
const playChord2 = function () {
  currentChord2.forEach((e) => {
    oscillators2.push(
      new OscillatorNode(thisAudio, { frequency: e * root2, type: "triangle" })
    );
  });

  oscillators2.forEach((someOsc2) => {
    someOsc2.connect(gain1);
    someOsc2.start();
  });
};

//-------toggle for chord 1-------------
let isPlaying1 = false;

const toggleOscillator1 = function () {
  if (isPlaying1) {
    oscillators1.forEach((osc1) => {
      osc1.stop(); // Stop the oscillator
      osc1.disconnect(); // Disconnect it from the gain node

      isPlaying1 = false;
      document.getElementById("play1").textContent = "Play Chord 1"; // Update button text
      oscillators1 = [];
    });
  } else {
    currentChord1.forEach((e) => {
      oscillators1.push(
        new OscillatorNode(thisAudio, {
          frequency: e * root1,
          type: "triangle",
        })
      );
    });
    oscillators1.forEach((someOsc1) => {
      someOsc1.connect(gain1);
      someOsc1.start();

      isPlaying1 = true;
      document.getElementById("play1").textContent = "Stop Chord 1"; // Update button text
    });
  }
};

let playBut1 = document.getElementById("play1");

playBut1.addEventListener("click", toggleOscillator1);

dropdown1.addEventListener("change", (event) => {
  let newQual = event.target.value;
  currentChord1 = chordLibrary[newQual];
});
//-----------------------------------------------

//-------toggle for chord 2-------------
let isPlaying2 = false;

const toggleOscillator2 = function () {
  if (isPlaying2) {
    oscillators2.forEach((osc2) => {
      osc2.stop(); // Stop the oscillator
      osc2.disconnect(); // Disconnect it from the gain node

      isPlaying2 = false;
      document.getElementById("play2").textContent = "Play Chord 1"; // Update button text
      oscillators2 = [];
    });
  } else {
    currentChord2.forEach((e) => {
      oscillators2.push(
        new OscillatorNode(thisAudio, {
          frequency: e * root2,
          type: "triangle",
        })
      );
    });
    oscillators2.forEach((someOsc2) => {
      someOsc2.connect(gain1);
      someOsc2.start();

      isPlaying2 = true;
      document.getElementById("play2").textContent = "Stop Chord 1"; // Update button text
    });
  }
};

let playBut2 = document.getElementById("play2");

playBut2.addEventListener("click", toggleOscillator2);

dropdown2.addEventListener("change", (event) => {
  let newQual = event.target.value;
  currentChord2 = chordLibrary[newQual];
});
//--------------------------------------------

const root1slide = document.getElementById("root1");
const root2slide = document.getElementById("root2");

root1slide.addEventListener("input", () => {
  let root1 = root1slide.value / 1000;
  root1 = Math.pow(root1, 0.5);
  root1 = root1 * 800;
  oscillators1.forEach((osc, i) => {
    osc.frequency.linearRampToValueAtTime(
      root1 * currentChord1[i],
      thisAudio.currentTime + 0.01
    );
  });
});

root2slide.addEventListener("input", () => {
  let root2 = root2slide.value / 1000;
  root2 = Math.pow(root2, 0.5);
  root2 = root2 * 800;
  oscillators2.forEach((osc, i) => {
    osc.frequency.linearRampToValueAtTime(
      root2 * currentChord2[i],
      thisAudio.currentTime + 0.01
    );
  });
});
