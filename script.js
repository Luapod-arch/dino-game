window.addEventListener("load", () => {
  const game = document.getElementById("game");
  const dino = document.getElementById("dino");
  const rock = document.getElementById("rock");
  const scoreEl = document.getElementById("score");
  const gameOverEl = document.getElementById("gameOver");

  let points = 0;
  let gameOver = false;

  // Score starten
  scoreEl.innerText = points;


  game.focus();

  function jump() {
    if (gameOver) return;
    if (dino.classList.contains("jump-animation")) return;

    dino.classList.add("jump-animation");
    setTimeout(() => dino.classList.remove("jump-animation"), 750); // muss zur CSS jump Dauer passen
  }

  function restart() {
    gameOver = false;
    points = 0;
    scoreEl.innerText = points;

    // Rock Animation neu starten
    rock.style.animation = "none";
    void rock.offsetWidth; // reflow
    rock.style.animation = "rockMove 2.6s infinite linear";
    rock.style.left = "600px";

    // Dino reset
    dino.classList.remove("jump-animation");
    dino.style.top = "225px";

    // Overlay ausblenden
    gameOverEl.classList.add("hidden");

    // Fokus wieder setzen
    game.focus();
  }

  function handleKeyDown(e) {
    // Neustart
    if (e.code === "KeyR" && gameOver) {
      e.preventDefault();
      restart();
      return;
    }

    // Springen (Space / ArrowUp / W)
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
      e.preventDefault();
      jump();
    }
  }

  // Keydown direkt auf game (zuverlässig mit tabindex + focus)
  game.addEventListener("keydown", handleKeyDown);

  // Klick: Fokus zurückholen + springen
  game.addEventListener("click", () => {
    game.focus();
    jump();
  });

  // Touch
  game.addEventListener("touchstart", () => {
    game.focus();
    jump();
  });

  // Game Loop (ruhiger)
  setInterval(() => {
    if (gameOver) return;

    const dinoTop = parseInt(getComputedStyle(dino).getPropertyValue("top"));
    const rockLeft = parseInt(getComputedStyle(rock).getPropertyValue("left"));

    // Score (wenn du doppelt so schnell willst: points += 2)
    points += 1;
    scoreEl.innerText = points;

    // Kollision
    if (rockLeft < 90 && rockLeft > 20 && dinoTop > 165) {
      gameOver = true;

      // Rock stoppen
      rock.style.animation = "none";
      rock.style.left = rockLeft + "px";

      // Overlay zeigen
      gameOverEl.classList.remove("hidden");
    }
  }, 100);
});
