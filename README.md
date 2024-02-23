# General Assembly

Project 1 is a space invaders inspired game called Tie Fighter Attack.
The goal is to clear all the enemies before they reach the ground of shot the player 3 times.

## Game's Link

[Tie Fighter Attack](https://hoenigma.github.io/SEB-Project-1/)

## Overview and Concept

I had a week for this project to build a grid-base game using HTML, CSS and Javascript.
My version is very similar to space invaders but with a Star Wars styling

## Technologies used

### HTML

- Header using Star Wars font found at "https://fonts.cdnfonts.com/css/star-wars"
- Div containing score, lives, start button, reset button and instructions
- Grid with a 169 celss (13 x 13 grid)

### CSS

- Grid and information Div was given flexbox
- Created classes for: Player Ship, Enemy Ships, Player laser and Enemy bomb

### JavaScript

- Assigning keys to move player
- Assign space to fire laser
- Move the enemies via `setInterval`
- Enemies drop bombs via `setInterval`
- Click to start and reset gane
- `Endgame` for 3 different scenarios- Player wins, enemy reaches bottom and enemy kills player

## What Happened each Day

Day 1:
I started by creating a wire frame and writing Pseudo code for the project.
The HTML is a very simple structure and was made to store the flex boxes.
I also made a grid box in javascript to store the game in.

Day 2:
Decided to do a Star Wars theme for the game so found assets including the font and images.
Styled up the HTML making flex boxes and making the classes for the assets.
I then started on Javascript where I started linking the DOM and gave the player movement abilities.

Day 3:
I gave the player ability to fire using the space bar.
Gave the enemies function to move and waht to do when they reach the edge of the grid.

Day 4:
After moving the enemies, they were giving the function for a random one to drop a bomb.
One end game fucntion was created for the 3 end game scenarios and to show the high score.

Day 5:
On the last day, I had to sort out some problems with the end game and clear up some of the code.
I had some time so I added some audio for the lasers and styled up the start and reset buttons.

### Game Start Screen

![Start Screen](images//GameStartScreen.png)
Game starts with all the player and ememies on the screen.
In the bar there is the score, lives, start and reset button.

### Player movement

The player ship is assinged the keycode for the left and right arrows keys.
To make sure the ship doesn't go thrpugh the end of the grid, statement were made to stop this:

- On the left if the position of the ship divided by the width had no remainder, it was on the far left grid cell and couldn't go any more left
- On the right if the position of the ship divided by the width had a remainder of width -1, it was on the far right grid cell and couldn't go any more right.

  ![Player Moves](images/PlayerMove.png)

### Player firing

Assigned the player's laser to be fired to the spacebar.
The laser is on a `setInterval` this will make it move up the cells once fired. When fired a sound will play.
Laser moves through each cell by having it:

- Remove class of laser from original cell.
- Moving it up a cell by minusing the width.
- Add the class if lazer to the new cell.

If the laser hits an enemy, the enemy will dissapear (remove class of enemy) and the laser will stop moving and be removed (clearInterval and remove class of lazer). When hit, player will gain 100 points and this is shown on screen

If the lazer makes it to the top of the grid (lazerFired < width) the lazer will be removed (clearInterval and remove class of lazer).

![Player Fires](images/PlayerLaserFired.png)

### Enemy movement

The enemies move due to the varaible enemiesMove.
The start of the game they are moving left (value of "left") meaning they will all go -1 cells. Like the player movement, the class needs to be removed from original cell, moved then added to the new cell.

When the enemies located on the far left reach the end of the grid, its given the value of "leftside" and a counter called moveDown goes up by 1. This makes all the enmies move down 1 cell (+ width). WHen it goes down the moveDown counter becomes 2 and as moveDown is now bigger than 1 the enemiesMove is now "right" and the moveDown counter is rested. This repeates when the enemies hit the far right side and the direction changes.

![Enemy Moves](images/MoveEnemies.png)

### Enemy Firing

To get the bombs to drop, I firstly created a random number generator for the amount of enemies in the enemies array.
This is then put into a new variable (enemyFiredLoc) to say the enemy at the postion of the random number, + width (so its below the enemy) a bomb class.

Like player lazer the bomb moves down the grid by removing the class, moving the bomb and adding the class to the new cell. If the bomb reaches the bottom of the grid and doesn't hit the enemy it will be removed. If the bomb hits the player an audio sound will play, the player will lose a live (shown on screen) and the bomb will be removed.

![Player Fires](images/EnemyBombFired.png)

### Endgame Scenarios

There are 3 end game scenarios:

1. The player removes all the enemies.
2. The enemies reach the bottom of the grid.
3. The enemies shoot the player 3 times.

Each of the senarios will create an alert either saying:
`Your score was ${playerScore} but the high score is ${highScore}` or (`New high score! ${playerScore}`);
High Score is storeed in local storage.

## Key Learnings:

The main thing I learnt was how to structure code and where to execute them.
I also had more practice on flex boxes and `setInterval`

## Challenges:

- Getting enemies to move down
- Sorting out setIntervals and how to stop them for endGame
- Stopping enemies from reseting everytime they moved

## Future Improvements:

- Create a level 2
- Create a modal for endGame

## Bugs:

- The lasers from the player can get stuck on the screen sometimes
