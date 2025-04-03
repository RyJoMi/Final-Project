const thisAudio = new AudioContext();

let root = 440;
let maj7 = [1, 1.25, 1.5, 1.875];
let dom7 = [1, 1.25, 1.5, 1.8];
let min7 = [1, 1.2, 1.5, 1.8];
let quality = [
  root * `${document.getElementById("chor1Qual").value}`[0],
  root * `${document.getElementById("chor1Qual").value}`[1],
  root * `${document.getElementById("chor1Qual").value}`[2],
  root * `${document.getElementById("chor1Qual").value}`[3],
];

const playChord1 = function () {
  //saves current time for reference
  let now = thisAudio.currentTime;

  //create osc
  let myOsc1 = thisAudio.createOscillator();
  let myOsc2 = thisAudio.createOscillator();
  let myOsc3 = thisAudio.createOscillator();
  let myOsc4 = thisAudio.createOscillator();

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
  myOsc1.connect(thisAudio.destination);
  myOsc2.connect(thisAudio.destination);
  myOsc3.connect(thisAudio.destination);
  myOsc4.connect(thisAudio.destination);
  //start
  myOsc1.start();
  myOsc2.start();
  myOsc3.start();
  myOsc4.start();
};

let playBut = document.getElementById("play");

playBut.addEventListener("click", playChord1);
