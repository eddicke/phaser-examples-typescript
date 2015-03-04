
var sprite1: Phaser.Sprite;
var sprite2: Phaser.Sprite;

var game = new Phaser.Game(800, 600, Phaser.CANVAS, "phaser-example", { 
    preload: () => {
        game.load.image("atari", "assets/sprites/atari130xe.png");
        game.load.image("mushroom", "assets/sprites/mushroom2.png");
    }, 

    create: () => {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = "#2d2d2d";

        //  This will check Sprite vs. Sprite collision using a custom process callback
        sprite1 = game.add.sprite(0, 200, "atari");
        sprite2 = game.add.sprite(750, 220, "mushroom");

        game.physics.enable([sprite1,sprite2], Phaser.Physics.ARCADE);

        //  We'll use random velocities so we can test it in our processCallback
        sprite1.body.velocity.x = 50 + Math.random() * 100;
        sprite2.body.velocity.x = -(50 + Math.random() * 100);
    }, 

    update: () => game.physics.arcade.collide(sprite1, sprite2, processCallbackCollisionHandler, processCallback, this), 

    render: () => {
        game.debug.text("The processCallback will only collide if sprite1 is going fastest.", 32, 32);
        game.debug.text("Sprite 1 speed: " + sprite1.body.speed, 32, 64);
        game.debug.text("Sprite 2 speed: " + sprite2.body.speed, 32, 96);
    } 
});

function processCallback (obj1: Phaser.Sprite, obj2: Phaser.Sprite) {
    //  This function can perform your own additional checks on the 2 objects that collided.
    //  For example you could test for velocity, health, etc.
    //  This function needs to return either true or false. If it returns true then collision carries on (separating the two objects).
    //  If it returns false the collision is assumed to have failed and aborts, no further checks or separation happen.

    if (obj1.body.speed > obj2.body.speed) {
        return true;
    } else {
        return false;
    }

}

function processCallbackCollisionHandler (obj1: Phaser.Sprite, obj2: Phaser.Sprite) {
    game.stage.backgroundColor = "#992d2d";
}
