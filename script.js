const thisAudio = new AudioContext();

let root = 440;
let maj7 = [1, 1.25, 1.5, 1.875];
let quality = [root * maj7[0], root * maj7[1], root * maj7[2], root * maj7[3]];

const playChord1 = function () {
  //saves current time for reference
  let now = thisAudio.currentTime;

  //create osc
  myOsc1 = thisAudio.createOscillator();
  myOsc2 = thisAudio.createOscillator();
  myOsc3 = thisAudio.createOscillator();
  myOsc4 = thisAudio.createOscillator();

  //frequencies
  myOsc1.frequency.value = quality[0];
  myOsc2.frequency.value = quality[1];
  myOsc3.frequency.value = quality[2];
  myOsc4.frequency.value = quality[3];
  //wave
  myOsc1.type = "triangle";
  myOsc2.type = "triangle";
  myOsc3.type = "triangle";
  myOsc4.type = "triangle";
  //connect
  myOsc1.connect(output);
  myOsc2.connect(output);
  myOsc3.connect(output);
  myOsc4.connect(output);
  //start
  myOsc1.start();
  myOsc2.start();
  myOsc3.start();
  myOsc4.start();
};

const log = function () {
  document.getElementById("log").textContent = root;
};

let playBut = document.getElementById("play");
playBut.addEventListener("click", playChord1, run, log);
