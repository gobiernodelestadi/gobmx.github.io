import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

/* =========================================
   DOM
========================================= */

const enterBtn =
  document.getElementById('enterBtn');

const introScreen =
  document.getElementById('introScreen');

const mainContent =
  document.getElementById('mainContent');

const music =
  document.getElementById('music');

const lyrics =
  document.getElementById('lyrics');

const photo =
  document.getElementById('photo');

/* =========================================
   SCENE
========================================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

/* =========================================
   CAMERA
========================================= */

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 20;

/* =========================================
   RENDERER
========================================= */

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

/* =========================================
   LIGHT
========================================= */

const light = new THREE.PointLight(
  0xff8800,
  300
);

light.position.set(10, 10, 10);

scene.add(light);

/* =========================================
   STARS
========================================= */

const starsGeometry =
  new THREE.BufferGeometry();

const starsCount =
  window.innerWidth < 768
    ? 2000
    : 5000;

const starsArray =
  new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i++) {

  starsArray[i] =
    (Math.random() - 0.5) * 200;

}

starsGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(
    starsArray,
    3
  )
);

const starsMaterial =
  new THREE.PointsMaterial({
    color: 0xffffff,
    size:
      window.innerWidth < 768
        ? 0.03
        : 0.02
  });

const stars =
  new THREE.Points(
    starsGeometry,
    starsMaterial
  );

scene.add(stars);

/* =========================================
   HEART
========================================= */

const heartShape =
  new THREE.Shape();

heartShape.moveTo(0, 0);

heartShape.bezierCurveTo(
  0, 0,
  -4, -4,
  -7, 2
);

heartShape.bezierCurveTo(
  -9, 6,
  -5, 11,
  0, 13
);

heartShape.bezierCurveTo(
  5, 11,
  9, 6,
  7, 2
);

heartShape.bezierCurveTo(
  4, -4,
  0, 0,
  0, 0
);

const extrudeSettings = {
  depth: 2,
  bevelEnabled: true,
  bevelSegments: 5,
  steps: 2,
  bevelSize: 0.3,
  bevelThickness: 0.3
};

const heartGeometry =
  new THREE.ExtrudeGeometry(
    heartShape,
    extrudeSettings
  );

const heartMaterial =
  new THREE.MeshStandardMaterial({

    color: 0xff0000,

    emissive: 0xff0000,

    emissiveIntensity: 17,

    metalness: 1,

    roughness: 0.15

  });

const heart =
  new THREE.Mesh(
    heartGeometry,
    heartMaterial
  );

heart.rotation.z = Math.PI;

scene.add(heart);

/* =========== ah==============================
   RESPONSIVE HEART
========================================= */

function updateHeartResponsive() {

  const width = window.innerWidth;

  let scale;
  let posY;
  let cameraZ;

  if (width < 480) {

    scale = 0.16;
    posY = 1;
    cameraZ = 28;

  }

  else if (width < 768) {

    scale = 0.22;
    posY = 1.5;
    cameraZ = 24;

  }

  else {

    scale = 0.3;
    posY = 2;
    cameraZ = 20;

  }

  heart.scale.set(
    scale,
    scale,
    scale
  );

  heart.position.set(
    0,
    posY,
    2
  );

  camera.position.z = cameraZ;

}

updateHeartResponsive();

/* =========================================
   GLOW RING
========================================= */

let ringRadius =
  window.innerWidth < 768
    ? 3.8
    : 5;

const glowGeometry =
  new THREE.TorusGeometry(
    ringRadius,
    0.12,
    32,
    200
  );

const glowMaterial =
  new THREE.MeshBasicMaterial({

    color: 0xffffff

  });

const glowRing =
  new THREE.Mesh(
    glowGeometry,
    glowMaterial
  );

glowRing.rotation.x = 1.3;

glowRing.position.y = -0.6;

scene.add(glowRing);

/* =========================================
   SHADOW RING
========================================= */

const shadowRing =
  new THREE.Mesh(

    new THREE.TorusGeometry(
      ringRadius + 0.2,
      0.30,
      30,
      200
    ),

    new THREE.MeshBasicMaterial({

      color: 0xf4A460,

      transparent: true,

      opacity: 0.25

    })

  );

shadowRing.rotation.x = 1.3;

shadowRing.position.y = -0.6;

scene.add(shadowRing);

/* =========================================
   TEXTS
========================================= */

const phrases = [

  'TE AMO ❤️',
  'MI VIDA ✨',
  'MI AMOR 💖',
  'MI CIELO 💌',
  'SIEMPRE 💍',
  'CONTIGO ❤️',
  'ERES TODO 🌙',
  'TE QUIERO 💕',
  '👑',
  'SOLO TÚ 👫',
  '❤️💫',
  'I LOVE YOU 💖',
    'TE AMO ❤️',
  'MI VIDA ✨',
  'MI AMOR 💖',
  'MI CIELO 💌',
  'SIEMPRE 💍',
  'CONTIGO ❤️',
  'ERES TODO 🌙',
  'TE QUIERO 💕',
  '👑',
  'SOLO TÚ 👫',
  '❤️💫',
  'I LOVE YOU 💖'

];

const textElements = [];

function createTexts() {

  textElements.forEach((t) => {
    t.element.remove();
  });

  textElements.length = 0;

  const radiusOuterX =
    window.innerWidth < 768
      ? 190
      : 290;

  const radiusOuterY =
    window.innerWidth < 768
      ? 145
      : 200;

  const radiusInnerX =
    window.innerWidth < 768
      ? 120
      : 200;

  const radiusInnerY =
    window.innerWidth < 768
      ? 80
      : 130;
  const total = phrases.length;

  for (let i = 0; i < total; i++) {

    const div =
      document.createElement('div');

    div.className = 'orbitText';
    div.innerText = phrases[i];

    mainContent.appendChild(div);

    const angle =
      (i / total) *
      Math.PI * 2;

    // Alternar órbitas
    const isOuter =
      i % 2 === 0;

    const radiusX =
      isOuter
        ? radiusOuterX
        : radiusInnerX;

    const radiusY =
      isOuter
        ? radiusOuterY
        : radiusInnerY;

    const x =
      Math.cos(angle) *
      radiusX;

    const y =
      Math.sin(angle) *
      radiusY;

    textElements.push({
      element: div,
      x,
      y
    });
  }
}


createTexts();












/* =========================================
   FLOATING ITEMS
========================================= */

function createFloatingItem(symbol) {

  const item =
    document.createElement('div');

  item.className =
    'floatingItem';

  item.innerHTML = symbol;

  document.body.appendChild(item);

  item.style.left =
    `${Math.random() * window.innerWidth}px`;

  item.style.top =
    `${window.innerHeight + 50}px`;

  const size =
    Math.random() * 30 + 20;

  item.style.fontSize =
    `${size}px`;

  const duration =
    window.innerWidth < 768
      ? Math.random() * 2 + 2
      : Math.random() * 3 + 2;

  item.animate(

    [

      {
        transform:
          'translateY(0px)',
        opacity: 1
      },

      {
        transform:
          `translateY(-${window.innerHeight + 200}px)`,
        opacity: 0
      }

    ],

    {

      duration:
        duration * 1000,

      easing: 'ease-out'

    }

  );

  setTimeout(() => {

    item.remove();

  }, duration * 1000);

}

/* =========================================
   FLOATING EFFECT
========================================= */

const symbols = [
  '❤️',
  '🌸',
  '💖',
  '🌺',
  '💕',
  '🌷'
];

const interval = setInterval(() => {

  const randomSymbol =
    symbols[
      Math.floor(
        Math.random() *
        symbols.length
      )
    ];

  createFloatingItem(randomSymbol);

}, 120);

setTimeout(() => {

  clearInterval(interval);

}, 4000);

/* =========================================
   MOUSE PARALLAX
========================================= */

document.addEventListener(
  'mousemove',
  (event) => {

    const mouseX =
      (event.clientX /
      window.innerWidth) - 0.5;

    const mouseY =
      (event.clientY /
      window.innerHeight) - 0.5;

    heart.rotation.x =
      mouseY * 0.5;

    heart.rotation.y =
      mouseX * 0.5;

  }
);

/* =========================================
   HEART PULSE
========================================= */

let scaleDirection = 1;

function pulseHeart() {

  const baseScale =
    window.innerWidth < 480
      ? 0.16
      : window.innerWidth < 768
      ? 0.22
      : 0.3;

  const maxScale =
    baseScale + 0.03;

  heart.scale.x +=
    0.0008 * scaleDirection;

  heart.scale.y +=
    0.0008 * scaleDirection;

  heart.scale.z +=
    0.0008 * scaleDirection;

  if (heart.scale.x >= maxScale) {

    scaleDirection = -1;

  }

  if (heart.scale.x <= baseScale) {

    scaleDirection = 1;

  }

}


const songLyrics = [

  {
    time: 0,
    text: ''
  },

  {
    time: 22,
    text: '♪ WE COULD LEAVE THE CHRISTMAS LIGHTS UP TILL JANUARY ♪'
  },

  {
    time: 29,
    text: '♪ THIS IS OUR PLACE, WE MAKE THE RULES AND THERE’S A DAZZLING HAZE ♪'
  },

  {
    time: 37,
    text: '♪ A MYSTERIOUS WAY ABOUT YOU, DEAR HAVE I KNOWN YOU 20 SECONDS OR 20 YEARS? ♪'
  },

  {
    time: 49,
    text: '♪ CAN I GO WHERE YOU GO? ♪'
  },

  {
    time: 56,
    text: '♪ CAN WE ALWAYS BE THIS CLOSE FOREVER AND EVER? ♪'
  },

  {
    time: 63,
    text: '♪ TAKE ME OUT AND TAKE ME HOME ♪'
  },

  {
    time: 70,
    text: '♪ YOU’RE MY, MY, MY, MY... LOVER ♪'
  },

  {
    time: 77,
    text: ''
  },

  {
    time: 85,
    text: '♪ WE COULD LET OUR FRIENDS CRASH IN THE LIVING ROOM ♪'
  },

  {
    time: 92,
    text: '♪ THIS IS OUR PLACE, WE MAKE THE CALL AND I’M HIGHLY SUSPICIOUS ♪'
  },

  {
    time: 100,
    text: '♪ THAT EVERYONE WHO SEES YOU WANTS YOU I’VE LOVED YOU THREE SUMMERS NOW, HONEY ♪'
  },

  {
    time: 108,
    text: '♪ BUT I WANT ’EM ALL CAN I GO WHERE YOU GO? ♪'
  },

  {
    time: 119,
    text: '♪ CAN WE ALWAYS BE THIS CLOSE FOREVER AND EVER? ♪'
  },

  {
    time: 126,
    text: '♪ TAKE ME OUT AND TAKE ME HOME ♪'
  },

  {
    time: 133,
    text: '♪ YOU’RE MY, MY, MY, MY... LOVER ♪'
  },

  {
    time: 140,
    text: '♪ LADIES AND GENTLEMEN, WILL YOU PLEASE STAND? WITH EVERY GUITAR STRING SCAR ON MY HAND ♪'
  },

  {
    time: 147,
    text: '♪ I TAKE THIS MAGNETIC FORCE OF A MAN TO BE MY LOVER MY HEART’S BEEN BORROWED ♪'
  },

  {
    time: 156,
    text: '♪ AND YOURS HAS BEEN BLUE ALL’S WELL THAT ENDS WELL TO END UP WITH YOU I SWEAR TO BE OVERDRAMATIC AND TRUE ♪'
  },

  {
    time: 164,
    text: '♪ TO MY LOVER AND YOU’LL SAVE ALL YOUR DIRTIEST JOKES FOR ME ♪'
  },

  {
    time: 174,
    text: '♪ AND AT EVERY TABLE, I’LL SAVE YOU A SEAT LOVER ♪'
  },

  {
    time: 182,
    text: '♪ CAN I GO WHERE YOU GO? ♪'
  },

  {
    time: 189,
    text: '♪ CAN WE ALWAYS BE THIS CLOSE FOREVER AND EVER? ♪'
  },

  {
    time: 196,
    text: '♪ TAKE ME OUT AND TAKE ME HOME ♪'
  },

  {
    time: 203,
    text: '♪ YOU’RE MY, MY, MY, MY... ♪'
  },

  {
    time: 209,
    text: '♪ OH, YOU’RE MY, MY, MY, MY... ♪'
  },

  {
    time: 216,
    text: '♪ OH, YOU’RE MY, MY, MY, MY... ♪'
  },

  {
    time: 223,
    text: '♪ DARLING, YOU’RE MY, MY, MY, MY... LOVER ♪'
  }

];
const songPhotos = [

  {
    time: 22,
    src: 'foto1.png'
  },

  {
    time: 49,
    src: 'foto2.png'
  },

  {
    time: 85,
    src: 'foto3.png'
  },

  {
    time: 140,
    src: 'foto4.png'
  }

];

let lastLyric = '';
let typingTimeout;

function typeWriter(text) {

  clearTimeout(
    typingTimeout
  );

  lyrics.textContent = '';

  let index = 0;

  function write() {

    if (
      index <
      text.length
    ) {

      lyrics.textContent +=
        text.charAt(index);

      index++;

      typingTimeout =
        setTimeout(
          write,
          40
        );

    }

  }

  write();

}

function updateLyrics() {

  const currentTime =
    music.currentTime;

  let currentText = '';

  for (
    let i = 0;
    i < songLyrics.length;
    i++
  ) {

    if (
      currentTime >=
      songLyrics[i].time
    ) {

      currentText =
        songLyrics[i].text;

    }

  }

  if (
    currentText !==
    lastLyric
  ) {

    lastLyric =
      currentText;

    typeWriter(
      currentText
    );

  }

}

let currentPhoto = '';

function updatePhoto() {

  const currentTime =
    music.currentTime;

  let photoToShow = '';

  for (
    let i = 0;
    i < songPhotos.length;
    i++
  ) {

    if (
      currentTime >=
      songPhotos[i].time
    ) {

      photoToShow =
        songPhotos[i].src;

    }

  }

  if (
    currentPhoto !==
    photoToShow
  ) {

    currentPhoto =
      photoToShow;

    photo.classList.remove(
      'show'
    );

    setTimeout(() => {

      photo.src =
        currentPhoto;

      photo.classList.add(
        'show'
      );

    }, 400);

  }

}

/* =========================================
   ANIMATION
========================================= */

function animate() {

  requestAnimationFrame(animate);

  stars.rotation.y += 0.0005;

  glowRing.rotation.z += 0.003;

  shadowRing.rotation.z -= 0.002;

  pulseHeart();
updateLyrics();
updatePhoto();
  textElements.forEach((text, index) => {

    const time =
      Date.now() * 0.0003;

    const offsetX =
      Math.cos(time + index) * 10;

    const offsetY =
      Math.sin(time + index) * 10;

    text.element.style.left =
      `${window.innerWidth / 2 + text.x + offsetX}px`;

    text.element.style.top =
      `${window.innerHeight / 2 + text.y + offsetY}px`;

  });

  renderer.render(
    scene,
    camera
  );

}

animate();

/* =========================================
   RESIZE
========================================= */

window.addEventListener(
  'resize',
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize( 
      window.innerWidth,
      window.innerHeight
    );

    updateHeartResponsive();

    createTexts();

  }
);

//BOTON DE INICIO DE PANTALLA

enterBtn.addEventListener(
  'click',
  () => {

    introScreen.style.display =
      'none';

    mainContent.style.display =
      'block';

    music.currentTime = 0;

    music.play().catch(error => {

      console.log(
        'No se pudo reproducir:',
        error
      );

    });

  }
);
