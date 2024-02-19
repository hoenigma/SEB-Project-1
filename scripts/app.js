//---CONNECT TO DOM AND START FUNCTION TO BUTTONS----//

//create the grid (13x13?),Var for grid, give it width and total cells

//Grab start button and add function to start game
//Grab reset button and add function to reset game

//----PLAYER'S TANK-------------------//
//add the player's TANK-assign cell with class (same cell each time when game starts)
//remove player's TANK when it moves
//give it left (keyCode =37) and right (keyCode=38) movements
//restrict movement to bottom cell
//stop it moving when hits end of grid
//add button to lazer (space)
//add sound effect to lazer firing
//what happens if lazer collides with spaceship-spaceship dissapears and gain points
//what happens if lazer hits top of cellgrid-stop lazer
//player gets hit by lazer-loses live
//player gets hit 3 times-end game

//---ENEMY SHIPS-----------------------//
//add multiple enemy spaceships at start-assign multiple cells of class spaceships
//Spaceships move one space after certain amount of time
//remove enemy spaceship and add them to the cell to the left of them after each timeinterval

//When the ships on the far left reach end of grid. ALL ships move down one then move right
//When shipd onthe far right reach end of grid. ALL ships move down one then move left
//If all ships on the side are gone, the ships in the cell nect to them become new end
//(IDEA) all ships will have the function that when 1 hits a cell at the end, ALL ships will move down and change direction

//assign ships at bottom of group to have class of bomb
//a bomb will be fired from a random ship at a time interval
//ship dissapers if hit by lazer
//ships keep in formation even if ship next to it is gone
//After some ships are gone, increase speed of enemies moving
//If all ships are gone, end game

//---END GAME-----------------------//
//Win- Player shoots all enemies
//Show score, let them know if new highscore or what the highscore is
//Button for next level/retry

//Lose- player shot 3 times ot enemy reaches same row as player
//Game over, show score, show current highscore and button to retry

//for both scenarios, store the players score

function init() {
  //Grabing elements from DOM and setting up Variables
  const grid = document.querySelector(".grid");
  const start = document.getElementById("start");
  const reset = document.getElementById("reset");
  const lives = document.querySelectorAll(".life");
  const width = 13;
  const totalCellCount = width * width;
  const cells = [];
  let playerCurrentPostion = 162;
  isGamePlaying = false;

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

  //creating a grid
  function createGrid() {
    for (let i = 0; i < totalCellCount; i++) {
      const cell = document.createElement("div");
      cell.innerText = i;
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
  }
  document.addEventListener("keydown", handleKeyPress);

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
    setInterval(() => {
      //remove class
      removeEnemies(enemiesCurrentPosition);

      // if (enemyDir === "touchright" || enemyDir === "touchleft") {
      //   item["position"] = item["position"] + width;}

      enemies.forEach((element) => {
        if (enemiesMove === "left") {
          element["position"] = element["position"] - 1;
        } else if (enemiesMove === "right") {
          element["position"] = element["position"] + 1;
        }
      });
      //add class
      addEnemies(enemiesCurrentPosition);

      if (enemies.filter((enemies) => enemies.position % width === 0)) {
        enemies["position"] = enemies["position"] + width;
        enemiesMove = "right";
      } else if (
        enemies.filter((enemies) => enemies.position % width !== width - 1)
      ) {
        enemies["position"] = enemies["position"] + width;
        enemiesMove = "left";
      }

      //is enemy at the end? use .filter to say any enemy that does this
      //for the left
    }, 2000);
  }

  start.addEventListener("click", moveEnemies);

  //function to move enemies
}
window.addEventListener("DOMContentLoaded", init);
