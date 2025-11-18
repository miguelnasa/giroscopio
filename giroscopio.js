let sound;
let alpha = 0; // Rotación alrededor del eje Z (compás)
let beta = 0;  // Rotación alrededor del eje X (inclinación adelante-atrás)
let gamma = 0; // Rotación alrededor del eje Y (inclinación izquierda-derecha)

function preload() {
  sound = loadSound('Ritmo Muisca.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  textSize(16);
  if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', onOrientationChange);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', onOrientationChange);
  }
}

function draw() {
  background(220);
  // Muestra los ángulos actuales
  text(`Alpha: ${alpha.toFixed(2)}°`, 20, 20);
  text(`Beta: ${beta.toFixed(2)}°`, 20, 50);
  text(`Gamma: ${gamma.toFixed(2)}°`, 20, 80);

  // Reproduce o detiene el sonido según los ángulos
  if (alpha > 90) {
    if (!sound.isPlaying()) {
      sound.play();
    }
  } else {
    if (sound.isPlaying()) {
      sound.stop();
    }
  }
}

function onOrientationChange(event) {
  alpha = event.alpha || 0;
  beta = event.beta || 0;
  gamma = event.gamma || 0;
}

