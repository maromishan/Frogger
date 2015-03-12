var currentScore = 0;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Control movement of enemies
    if(this.x<505){
        this.x += (250*dt);
    }else{
        this.x =- this.x - 90;
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//Player class
var Player = function(x, y){
   this.sprite = 'images/char-boy.png';
   this.x = x;
   this.y = y;
}

Player.prototype.update = function(dt) {

    //detect collisions between player and enemy; reset player location when collision detected
                  for(var enemy in allEnemies){
                     if(allEnemies[enemy].x - 45 < this.x && allEnemies[enemy].x + 45 > this.x
                        && allEnemies[enemy].y - 45 < this.y && allEnemies[enemy].y + 45 > this.y ){
                        //allEnemies[enemy].x-10<player.x<allEnemies[enemy].x +10 && allEnemies[enemy].y-10<player.y<allEnemies[enemy].y+10)
                        player.reset();
                     }
                  }

            //reset player location when player reaches water
            if(this.y < 15){
                player.reset();
                currentScore = currentScore + 1;
                document.getElementById('score').innerHTML = "Score: " + currentScore;

            }
}
//Draw the player of the screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
   if(key == 'left' && this.x > 20){
      this.x -= 101;
   }else if(key == 'right' && this.x < 400){
      this.x += 101;
   }else if(key == 'up' && this.y > 15){
       this.y -= 82;
   }else if(key == 'down' && this.y < 350){
       this.y += 82;
   }else{
    player.reset();
   }
}

Player.prototype.reset = function(){
       this.x = 202.5;
       this.y = 385;

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
enemy1 = new Enemy(-500, 230);
enemy2 = new Enemy(-222, 148);
enemy3 = new Enemy(-100, 64);

allEnemies = [enemy1, enemy2, enemy3];

var player = new Player(202.5, 385);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
