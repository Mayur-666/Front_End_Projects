const introMusic = new Audio("./music/introSong.mp3");
const shootingMusic = new Audio("./music/shoooting.mp3");
const killMusic = new Audio("./music/killEnemy.mp3");
const ultWeaponMusic = new Audio("./music/hugeWeapon.mp3");
const heavyWeaponMusic = new Audio("./music/heavyWeapon.mp3");
const gameOverMusic = new Audio("./music/gameOver.mp3");

introMusic.play();

const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);

canvas.width = innerWidth;
canvas.height = innerHeight;

const lightWeaponDamage = 10;
const heavyWeaponDamage = 20;
let difficulty = 2;
const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");
let playerScore = 0;

document.querySelector("input").addEventListener("click", (e) => {
    e.preventDefault();
    introMusic.pause();
    form.style.display = "none";
    const userValue = form.difficulty.value;
    scoreBoard.style.display = "block";

    switch (userValue) {
        case "Medium":
            setInterval(spawnEnemy, 1400);
            return difficulty = 8;
        case "Hard":
            setInterval(spawnEnemy, 1000);
            return difficulty = 10;
        case "Insane":
            setInterval(spawnEnemy, 700);
            return difficulty = 12;
        default:
            setInterval(spawnEnemy, 2000);
            return difficulty = 5;
    }
})

const gameOver = () => {
    const gameOverBanner = document.createElement('div');
    const gameOverBtn = document.createElement('button');
    const highScore = document.createElement('div');


    const oldHighScore = localStorage.getItem("highScore") && localStorage.getItem("highScore");

    if (oldHighScore < playerScore) {
        localStorage.setItem("highScore", playerScore);
    }

    highScore.innerHTML = `High Score : ${localStorage.getItem('highScore') ? localStorage.getItem('highScore') : playerScore}`;
    gameOverBtn.innerText = "Play Again!";
    gameOverBanner.appendChild(highScore);
    gameOverBanner.appendChild(gameOverBtn);

    gameOverBtn.onclick = () => {
        window.location.reload();
    }
    gameOverBanner.classList.add("gameOver");
    document.body.appendChild(gameOverBanner);
}

const context = canvas.getContext("2d");

playerPosition = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
    }
}
/* ------------------------------------------------------------------- */
class Weapon {
    constructor(x, y, radius, color, velocity, damage) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.damage = damage;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
/* ------------------------------------------------------------------- */
class UltimateWeapon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = " rgb(245, 3, 152)";
    }
    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 200, canvas.height);
    }

    update() {
        this.draw();
        this.x += 20;
    }
}
/* ------------------------------------------------------------------- */
class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
/* ------------------------------------------------------------------- */

const friction = 0.98;
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    draw() {
        context.save()
        context.globalAlpha = this.alpha;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.restore()
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

const player = new Player(playerPosition.x, playerPosition.y, 20, "white");

const weapons = [];
const ultimateWeapon = [];
const enemies = [];
const particles = [];

const spawnEnemy = () => {

    const enemySize = Math.random() * (40 - 5) + 5;
    const enemyColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;

    let random;
    if (Math.random() < 0.5) {
        random = {
            x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
            y: Math.random() * canvas.height,
        }
    } else {
        random = {
            x: Math.random() * canvas.width,
            y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
        }
    }

    const angle = Math.atan2(
        canvas.height / 2 - random.y,
        canvas.width / 2 - random.x
    );
    const velocity = {
        x: Math.cos(angle) * difficulty,
        y: Math.sin(angle) * difficulty,
    }

    enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity))
}

let animationID;
function animation() {
    animationID = requestAnimationFrame(animation);
    context.fillStyle = "rgba(49, 49, 49, 0.2)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();

    scoreBoard.innerHTML = `Score : ${playerScore}`;


    particles.forEach((particle, particleIndex) => {
        if (particle.alpha <= 0) {
            particles.splice(particleIndex, 1);
        } else {
            particle.update();
        }
    })

    ultimateWeapon.forEach((ultWeapon, ultWeaponIndex) => {
        if (ultWeapon.x > canvas.width) {
            ultimateWeapon.splice(ultWeaponIndex, 1);
        } else {
            ultWeapon.update();
        }
    })

    // player.update()
    weapons.forEach((weapon, weaponIndex) => {
        weapon.update();

        if (weapon.x + weapon.radius < 0 || weapon.x - weapon.radius > canvas.width || weapon.y + weapon.radius < 0 || weapon.y - weapon.radius > canvas.height) {
            setTimeout(() => {
                weapons.splice(weaponIndex, 1);
            }, 0);
        }
    })

    enemies.forEach((enemy, enemyIndex) => {
        enemy.update();

        const distanceBetweenPlayerAndEnemy = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        if (distanceBetweenPlayerAndEnemy - player.radius - enemy.radius < 1) {
            cancelAnimationFrame(animationID);
            gameOverMusic.play();
            killMusic.pause();
            ultWeaponMusic.pause();
            shootingMusic.pause();
            heavyWeaponMusic.pause();
            return gameOver();
        }

        ultimateWeapon.forEach((ultWeapon) => {
            const distanceBetweenUltWeaponAndEnemy = ultWeapon.x - enemy.x;
            if (distanceBetweenUltWeaponAndEnemy <= 200 && distanceBetweenUltWeaponAndEnemy >= -200) {
                playerScore += 10;
                setTimeout(() => {
                    killMusic.play();
                    enemies.splice(enemyIndex, 1);
                }, 0);
            }
        })


        weapons.forEach((weapon, weaponIndex) => {
            const distanceBetweenWeaponAndEnemy = Math.hypot(weapon.x - enemy.x, weapon.y - enemy.y);
            if (distanceBetweenWeaponAndEnemy - weapon.radius - enemy.radius < 1) {
                killMusic.play();

                if (enemy.radius > weapon.damage + 8) {
                    gsap.to(enemy, {
                        radius: enemy.radius - weapon.damage,
                    });
                    setTimeout(() => {
                        weapons.splice(weaponIndex, 1);
                    }, 0)
                } else {
                    for (let i = 0; i < enemy.radius * 5; i++) {
                        particles.push(new Particle(weapon.x, weapon.y, Math.random() * 2, enemy.color, {
                            x: (Math.random() - 0.5) * (Math.random() * 7),
                            y: (Math.random() - 0.5) * (Math.random() * 7)
                        }))
                    }
                    playerScore += 10;
                    scoreBoard.innerHTML = `Score : ${playerScore}`;
                    setTimeout(() => {

                        weapons.splice(weaponIndex, 1);
                        enemies.splice(enemyIndex, 1);
                    }, 0);
                }
            }
        })
    })
}

animation();

canvas.addEventListener("click", (e) => {
    const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);
    const velocity = {
        x: Math.cos(angle) * 6,
        y: Math.sin(angle) * 6,
    }
    shootingMusic.play();
    weapons.push(new Weapon(canvas.width / 2, canvas.height / 2, 6, "white", velocity, lightWeaponDamage));

})

//right click heavy weapon
canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    if (playerScore < 5) return;
    heavyWeaponMusic.play();
    playerScore -= 5;
    scoreBoard.innerHTML = `Score : ${playerScore}`
    const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2);
    const velocity = {
        x: Math.cos(angle) * 3,
        y: Math.sin(angle) * 3,
    }
    weapons.push(new Weapon(canvas.width / 2, canvas.height / 2, 30, "cyan", velocity, heavyWeaponDamage));

})
addEventListener("keypress", (e) => {
    if (e.key === " ") {
        if (playerScore < 20) return;
        ultWeaponMusic.play();
        playerScore -= 20;
        scoreBoard.innerHTML = `Score : ${playerScore}`
        ultimateWeapon.push(new UltimateWeapon(0, 0));
    }

})
addEventListener("contextmenu", e => e.preventDefault());
addEventListener("resize", () => {
    window.location.reload();
})