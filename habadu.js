const bubbleCanvas = document.getElementById('bubble-canvas');
const rippleCanvas = document.getElementById('ripple-canvas');
const bubbleCtx = bubbleCanvas.getContext('2d');
const rippleCtx = rippleCanvas.getContext('2d');

bubbleCanvas.width = window.innerWidth;
bubbleCanvas.height = window.innerHeight;
rippleCanvas.width = window.innerWidth;
rippleCanvas.height = window.innerHeight;

let bubbles = [];

function Bubble() {
  this.x = Math.random() * bubbleCanvas.width;
  this.y = bubbleCanvas.height + 50;
  this.radius = Math.random() * 20 + 5;
  this.speed = Math.random() * 2 + 1;
  this.color = 'rgba(255, 255, 255, 0.7)';

  this.draw = function() {
    bubbleCtx.beginPath();
    bubbleCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    bubbleCtx.fillStyle = this.color;
    bubbleCtx.fill();
    bubbleCtx.closePath();
  };

  this.update = function() {
    this.y -= this.speed;
    this.draw();
  };
}

function createBubbles() {
  for (let i = 0; i < 20; i++) {
    bubbles.push(new Bubble());
  }
}

function animateBubbles() {
  requestAnimationFrame(animateBubbles);
  bubbleCtx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);

  bubbles.forEach(bubble => {
    bubble.update();
    if (bubble.y < -bubble.radius) {
      bubble.y = bubbleCanvas.height + bubble.radius;
    }
  });
}

createBubbles();
animateBubbles();

let ripples = [];

function drawRipple(x, y, radius) {
  rippleCtx.beginPath();
  rippleCtx.arc(x, y, radius, 0, Math.PI * 2);
  rippleCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  rippleCtx.stroke();
  rippleCtx.closePath();
}

function updateRipples() {
  ripples.forEach((ripple, index) => {
    ripple.radius += 2;
    if (ripple.radius > 50) {
      ripples.splice(index, 1);
    }
  });
}

document.addEventListener('mousemove', e => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  ripples.push({ x: mouseX, y: mouseY, radius: 10 });
});

function animateRipples() {
  requestAnimationFrame(animateRipples);
  rippleCtx.clearRect(0, 0, rippleCanvas.width, rippleCanvas.height);
  updateRipples();
  ripples.forEach(ripple => {
    drawRipple(ripple.x, ripple.y, ripple.radius);
  });
}

animateRipples();

document.addEventListener('DOMContentLoaded', function() {
  const oceanAudio = document.getElementById('ocean-audio');
  const clickSound = document.getElementById('click-sound');

  oceanAudio.loop = true;
  oceanAudio.play();

  document.addEventListener('click', function() {
    oceanAudio.currentTime = 0; 
    oceanAudio.play();
    
    clickSound.currentTime = 0; 
    clickSound.play();
  });
});
