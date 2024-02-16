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
  const grid = document.querySelector(".grid");

  const width = 10;
  const totalCellCount = width * width;
  const cells = [];

  function createGrid() {
    for (let i = 0; i < totalCellCount; i++) {
      const cell = document.createElement("div");
      cell.innerText = i;
      grid.appendChild(cell);
      cells.push(cell);
    }
  }
  createGrid();
}
window.addEventListener("DOMContentLoaded", init);
