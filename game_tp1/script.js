const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImg = new Image();
playerImg.src = "assets/player.png";

const playerDamagedImg = new Image();
playerDamagedImg.src = "assets/playerDamaged.png";

const lifeImg = new Image();
lifeImg.src = "assets/life.png";

const laserImg = new Image();
laserImg.src = "assets/laser.png";

const enemiesImg = {
  ship: "assets/enemy1.png",
  ufo: "assets/ufo.png",
  asteroid_large: "assets/asteroid_large.png",
  asteroid_small: "assets/asteroid_small.png"
};

let gameRunning = false;
let gamePaused = false;
let lastUpdate = Date.now();
let obstacles = [];
let lasers = [];
let score = 0;
let lives = 3;
let damageTimer = 0;
let speedMultiplier = 1;
let player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 80,
  width: 50,
  height: 50,
  speed: 5
};

function drawPlayer() {
  ctx.drawImage(damageTimer > 0 ? playerDamagedImg : playerImg, player.x, player.y, player.width, player.height);
}

function drawHUD() {
  document.getElementById("score").textContent = `Pontuação: ${score}`;
  const livesDiv = document.getElementById("lives");
  livesDiv.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    let img = document.createElement("img");
    img.src = lifeImg.src;
    livesDiv.appendChild(img);
  }
}

function drawLaser(laser) {
  ctx.drawImage(laserImg, laser.x, laser.y, 10, 30);
}

function drawObstacle(o) {
  ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
}

function updateLasers() {
  lasers.forEach(l => l.y -= 8);
  lasers = lasers.filter(l => l.y > -30);
}

function spawnObstacle() {
  const types = ["ship", "ufo", "asteroid_large", "asteroid_small"];
  const type = types[Math.floor(Math.random() * types.length)];
  const img = new Image();
  img.src = enemiesImg[type];
  const width = type.includes("asteroid") ? (type === "asteroid_large" ? 60 : 30) : 50;
  const height = width;
  obstacles.push({
    type,
    img,
    x: Math.random() * (canvas.width - width),
    y: -height,
    width,
    height,
    speed: Math.random() * 2 + 1 * speedMultiplier
  });
}

function updateObstacles() {
  obstacles.forEach(o => o.y += o.speed);
  obstacles = obstacles.filter(o => o.y < canvas.height + o.height);
}

function checkCollisions() {
  obstacles.forEach((o, oi) => {
    // Player hit
    if (
      player.x < o.x + o.width &&
      player.x + player.width > o.x &&
      player.y < o.y + o.height &&
      player.y + player.height > o.y
    ) {
      obstacles.splice(oi, 1);
      lives--;
      damageTimer = 60;
      if (lives <= 0) endGame();
    }

    // Laser hit
    lasers.forEach((l, li) => {
      if (
        l.x < o.x + o.width &&
        l.x + 10 > o.x &&
        l.y < o.y + o.height &&
        l.y + 30 > o.y
      ) {
        lasers.splice(li, 1);
        obstacles.splice(oi, 1);
        switch (o.type) {
          case "asteroid_large": score += 10; break;
          case "ufo": score += 20; break;
          case "ship": score += 50; break;
          case "asteroid_small": score += 100; break;
        }
      }
    });
  });
}

function endGame() {
  gameRunning = false;
  document.getElementById("game-over").classList.remove("hidden");
}

function restartGame() {
  player.x = canvas.width / 2 - 25;
  lives = 3;
  score = 0;
  obstacles = [];
  lasers = [];
  gameRunning = false;
  gamePaused = false;
  damageTimer = 0;
  speedMultiplier = 1;
  document.getElementById("game-over").classList.add("hidden");
  drawHUD();
}

function gameLoop() {
  if (!gameRunning || gamePaused) return requestAnimationFrame(gameLoop);

  const now = Date.now();
  const delta = now - lastUpdate;
  lastUpdate = now;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawHUD();
  updateLasers();
  updateObstacles();
  checkCollisions();

  lasers.forEach(drawLaser);
  obstacles.forEach(drawObstacle);

  if (Math.random() < 0.02) spawnObstacle();

  if (damageTimer > 0) damageTimer--;

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") player.x = Math.max(0, player.x - player.speed);
  if (e.code === "ArrowRight") player.x = Math.min(canvas.width - player.width, player.x + player.speed);
  if (e.code === "Space") {
    if (!gameRunning) {
      gameRunning = true;
      lastUpdate = Date.now();
      setInterval(() => { speedMultiplier += 0.2 }, 60000); // +20% por minuto
      requestAnimationFrame(gameLoop);
    } else if (!gamePaused) {
      lasers.push({ x: player.x + 20, y: player.y });
    }
  }
  if (e.code === "KeyP") gamePaused = !gamePaused;
});

