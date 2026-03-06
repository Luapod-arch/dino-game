window.addEventListener("load", () => {

const game = document.getElementById("game");
const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const scoreEl = document.getElementById("score");
const gameOverEl = document.getElementById("gameOver");
const startButton = document.getElementById("startButton");

let points = 0;
let gameOver = false;
let gameRunning = false;

scoreEl.innerText = "Score: 0";

/* Hindernis am Anfang stoppen */
obstacle.style.animation = "none";

game.focus();

/* Springen */

function jump(){

if(!gameRunning || gameOver) return;

if(character.classList.contains("jump-animation")) return;

character.classList.add("jump-animation");

setTimeout(()=>{
character.classList.remove("jump-animation");
},900);

}

/* Spiel starten */

function startGame(){

console.log("Start Button wurde geklickt");

gameRunning = true;
gameOver = false;
points = 0;

scoreEl.innerText = "Score: 0";

character.classList.remove("jump-animation");
character.classList.remove("crash-animation");
character.style.bottom = "40px";

obstacle.style.animation = "none";
void obstacle.offsetWidth;
obstacle.style.animation = "obstacleMove 3s infinite linear";

gameOverEl.classList.add("hidden");

startButton.classList.add("hidden");

game.focus();

}

/* Spiel beenden */

function endGame(){

gameOver = true;
gameRunning = false;

obstacle.style.animation = "none";

/* Kollision Animation starten */
character.classList.add("crash-animation");

gameOverEl.classList.remove("hidden");

startButton.innerText = "Neu starten";
startButton.classList.remove("hidden");

}

/* Tastatur Steuerung */

function handleKeyDown(event){

if(event.code === "KeyR" && gameOver){
event.preventDefault();
startGame();
return;
}

if(event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW"){
event.preventDefault();
jump();
}

}

/* Event Handler */

startButton.addEventListener("click", startGame);

game.addEventListener("keydown", handleKeyDown);

game.addEventListener("click", ()=>{
game.focus();
jump();
});

/* Game Loop */

setInterval(()=>{

if(!gameRunning || gameOver) return;

const characterBottom = parseInt(
getComputedStyle(character).getPropertyValue("bottom")
);

const obstacleRight = parseInt(
getComputedStyle(obstacle).getPropertyValue("right")
);

points += 1;
scoreEl.innerText = "Score: " + points;

/* Kollisionsprüfung */

if(obstacleRight > game.offsetWidth-200 && characterBottom < 120){

endGame();

}

},100);

});
