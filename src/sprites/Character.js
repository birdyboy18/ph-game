import { Phaser, Input } from 'phaser'

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset, 1)
        this.anchor.setTo(0.5);
        this.speed = 2;
        this.direction = this.speed;
        this.setUpKeyboard();
        this.setUpAnimations();
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
    }

    update () {
        game.physics.arcade.collide(this, game.blockingLayer);
        this.handleMove();
    }

    setUpKeyboard() {
        this.cursors = game.input.keyboard.createCursorKeys();
    }

    handleMove() {
        if (this.cursors.right.isDown) {
            //this.left += this.direction;
            this.body.velocity.x += this.direction;
            this.animations.play('run');
            this.scale.x = 1;
        }

        if (this.cursors.left.isDown) {
            // this.left += this.direction * -1;
            this.body.velocity.x -= this.direction;
            this.animations.play('run');
            this.scale.x = -1;
        }

        if (this.cursors.down.isDown) {
            //this.top += this.direction;
            this.body.velocity.y += this.direction;
        }

        if (this.cursors.up.isDown) {
            // this.top += this.direction * -1;
            this.body.velocity.y -= this.direction;
        }
    }

    setUpAnimations() {
        this.animations.add('walk', [1,2,3,4], 10, false);
        this.animations.add('run', [14,15,17], 10, false);
    }
}
