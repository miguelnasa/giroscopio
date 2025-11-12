let sound;
let lastOrientation = null;

function preload() {
  // Carga un archivo de sonido (debe estar en la misma carpeta o usar una URL)
  sound = loadSound('tu_sonido.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Solicita permiso para acceder al giroscopio
  if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', onOrientationChange);
        }
      })
      .catch(console.error);
  } else {
    // Para navegadores antiguos o iOS sin permiso
    window.addEventListener('deviceorientation', onOrientationChange);
  }
}

function draw() {
  background(220);
  // Muestra la orientación actual
  textAlign(CENTER, CENTER);
  textSize(24);
  text('Orientación: ' + deviceOrientation, width/2, height/2);
}

function onOrientationChange(event) {
  // Detecta cambios en la orientación
  const currentOrientation = deviceOrientation;
  if (lastOrientation !== currentOrientation && sound.isPlaying() === false) {
    sound.play();
  }
  lastOrientation = currentOrientation;
}
