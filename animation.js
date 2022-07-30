window.onload = function() {
  initCanvasElement();
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const ball = new Ball(80, "#cc0099");
  const vx = 2;
  const vy = 0;
  ball.x = 0;
  ball.y = 400;
  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.x += vx;
    ball.y += vy;
    ball.draw(context);
  }());
};

function canvasWindowSizer(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initCanvasElement() {
  const canvas = document.getElementById('canvas');
  canvasWindowSizer(canvas);
  window.addEventListener('resize', canvasWindowSizer);
}

function Ball (radius, color) {
  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = color;
  this.lineWidth = 1;
}

Ball.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();
}
