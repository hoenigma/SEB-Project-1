function init() {
  //Grabing elements from DOM and setting up Variables
  const gridWrapper = document.querySelector(".grid-wrapper");
  const grid = document.querySelector(".grid");
  const start = document.getElementById("start");
  const reset = document.getElementById("reset");
  let livesSpan = document.querySelector(".lives");
  let lives = 3;
  let scoreDisplay = document.getElementById("score-display");
  const width = 13;
  const totalCellCount = width * width;
  const cells = [];
  let playerCurrentPostion = 162;
  let playerScore = 0;
  const audioPlayer = new Audio("./assets/Gun+Silencer.mp3");
  const audioEnemy = new Audio("./assets/Gun+1.mp3");

  //setting up postion for enemy
  let enemies = [];
  //let enemyStart = 57;
  let enemiesCurrentPosition = [
    16, 17, 18, 19, 20, 21, 22, 29, 30, 31, 32, 33, 34, 35, 42, 43, 44, 45, 46,
    47, 48, 55, 56, 57, 58, 59, 60, 61,
  ];
  //put for every position an enemy as an object in array, with position and index as keys
  enemiesCurrentPosition.forEach((element, i) => {
    enemies[i] = { position: enemiesCurrentPosition[i], ind: i };
  });

  let enemiesMove = "left"; //start the enemies moving left
  let moveDown = 0; //counter for moving the enemies down

  //creating a grid
  function createGrid() {
    for (let i = 0; i < totalCellCount; i++) {
      const cell = document.createElement("div");
      //cell.innerText = i;
      grid.appendChild(cell);
      cells.push(cell);
    }
    addPlayer(playerCurrentPostion);
    addEnemies();
  }
  createGrid();

  //functions for adding, removing and moving the player
  function addPlayer(position) {
    cells[position].classList.add("player");
  }
  function removePlayer(position) {
    cells[position].classList.remove("player");
  }
  function handleKeyPress(event) {
    removePlayer(playerCurrentPostion);
    //move left (keyCode = 37)
    if (event.keyCode === 37 && playerCurrentPostion % width !== 0) {
      playerCurrentPostion--;

      // move right (keyCode = 39)
    } else if (
      event.keyCode === 39 &&
      playerCurrentPostion % width !== width - 1
    ) {
      playerCurrentPostion++;
    }
    addPlayer(playerCurrentPostion);

    if (event.keyCode === 32) {
      playerFire();
      audioPlayer.play();
      event.preventDefault();
    }
  }
  document.addEventListener("keydown", handleKeyPress);

  //firing projectile, laser appear above ship, laser class remove and added to cell above

  function addLaser(position) {
    cells[position].classList.add("player-laser");
  }

  function removeLaser(position) {
    cells[position].classList.remove("player-laser");
  }

  function playerFire() {
    let laserFired = playerCurrentPostion;
    laserTimer = setInterval(() => {
      if (
        !cells[laserFired].classList.contains("player-laser") ||
        laserFired > width
      ) {
        removeLaser(laserFired);
        laserFired = laserFired - width;
        addLaser(laserFired);

        //The player's laser and collides with the enemey
        if (
          cells[laserFired].classList.contains("enemy") &&
          cells[laserFired].classList.contains("player-laser")
        ) {
          console.log("Collision");
          enemies = enemies.filter(
            (element) => element.position !== laserFired
          ); // delete this enemy from arr
          //console.log(enemies);
          cells[laserFired].classList.remove("enemy"); // delete enemy class from this cell
          removeLaser(laserFired);
          clearInterval(laserTimer);
          playerScore = playerScore + 100;
          console.log(playerScore);
          scoreDisplay.textContent = playerScore;

          if (enemies.length === 0) {
            console.log("All Killed");
            clearInterval(laserTimer);
            endGame();
          }
        }
      } else if (laserFired < width) {
        clearInterval(laserTimer);
        removeLaser(laserFired);
      }
    }, 100);
  }

  //functions for adding and removing the enemies
  function addEnemies() {
    enemies.forEach((element) => {
      cells[element.position].classList.add("enemy");
    });
  }
  function removeEnemies() {
    enemies.forEach((element) => {
      cells[element.position].classList.remove("enemy");
    });
  }

  //function for moving enemy
  function moveEnemies() {
    timer = setInterval(() => {
      //remove class
      removeEnemies(enemies);

      enemies.forEach((element) => {
        if (enemiesMove === "leftside" || enemiesMove === "rightside") {
          element["position"] = element["position"] + width;
        } else if (enemiesMove === "left") {
          element["position"] = element["position"] - 1;
        } else if (enemiesMove === "right") {
          element["position"] = element["position"] + 1;
        }
      });
      //add class
      addEnemies(enemies);

      //is enemy at the end? use .filter to say any enemy that does this
      if (
        enemies.filter((enemies) => enemies["position"] % width === 0).length >
        0
      ) {
        enemiesMove = "leftside";
        moveDown += 1;
      } else if (
        enemies.filter((enemies) => enemies["position"] % width === width - 1)
          .length > 0
      ) {
        enemiesMove = "rightside";
        moveDown += 1;
      }

      //once moved down, change direction
      if (enemiesMove === "leftside" && moveDown > 1) {
        enemiesMove = "right";
        moveDown = 0;
      }

      if (enemiesMove === "rightside" && moveDown > 1) {
        enemiesMove = "left";
        moveDown = 0;
      }
      //when enemies reach bottom of grid
      if (
        enemies.some((elements) => elements.position >= width * width - width)
      ) {
        console.log("GAME OVER");
        clearInterval(timer);
        endGame();
      }
      dropBomb();
    }, 700);
  }

  // enemies shooting function
  // function for add + remove class
  function addBombs(element) {
    cells[element].classList.add("enemy-bomb");
  }

  function removeBombs(element) {
    cells[element].classList.remove("enemy-bomb");
  }

  function dropBomb() {
    let rate = Math.floor(Math.random() * enemies.length); //chosing a random number for the bomb to drop

    //console.log(rate);
    let enemyFiredLoc = enemies[rate]?.position + width; //use the random number to pick an enemy
    //console.log(enemyFiredLoc);

    if (
      !enemies.some(
        (element) => element.position >= width * width - width * 2
      ) &&
      !cells[enemyFiredLoc].classList.contains("enemy")
    ) {
      const dropInterval = setInterval(() => {
        removeBombs(enemyFiredLoc);
        enemyFiredLoc = enemyFiredLoc += 13;
        addBombs(enemyFiredLoc);
        console.log("bomb moved");
        if (enemyFiredLoc > 155) {
          console.log("bomb gone");
          removeBombs(enemyFiredLoc);
          clearInterval(dropInterval);
        }
        if (enemyFiredLoc === playerCurrentPostion) {
          audioEnemy.play();
          removeBombs(enemyFiredLoc);
          clearInterval(dropInterval);
          console.log("player hit!");
          lives = lives - 1;
          livesSpan.innerHTML = lives;
          if (lives === 0) {
            console.log("Game Over");
            clearInterval(dropInterval);
            endGame();
          }
        }
        // if (isGamePlaying === false) {
        //   removeBombs(bombStart);
        //   clearInterval(dropInterval);
        // }
      }, 800);
    }
  }

  //endgame function
  function endGame() {
    removeEnemies();
    const highScore = localStorage.getItem("high-score");
    if (!highScore || playerScore > highScore) {
      localStorage.setItem("high-score", playerScore);
    }
    setTimeout(() => {
      if (highScore >= playerScore) {
        alert(
          `Your score was ${playerScore} but the high score is ${highScore}`
        );
      } else {
        alert(`New high score! ${playerScore}`);
      }
    }, 50);
    console.log(`high score is`, highScore);
  }

  // Reset game function
  function resetGame() {
    location.reload();
  }

  start.addEventListener("click", moveEnemies);
  reset.addEventListener("click", resetGame);
}
window.addEventListener("DOMContentLoaded", init);
