import { Phaser, Input } from 'phaser'

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset, 1)
        this.anchor.setTo(0.5);
        this.speed = 5;
        this.direction = this.speed;
        this.setUpKeyboard();
        this.setUpAnimations();
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.touchingGround = false;
        this.isFalling = false;
    }

    update () {
        this.touchingGround = game.physics.arcade.collide(this, game.blockingLayer);
        this.handleMove();
    }

    setUpKeyboard() {
        this.cursors = game.input.keyboard.createCursorKeys();
    }

    handleMove() {
        if (this.cursors.right.isDown) {
            //this.left += this.direction;
            if ( this.body.velocity.x <= 100) {
                this.body.velocity.x += this.direction;
            }
            if (this.touchingGround) {
                this.animations.play('run');
            }
            this.scale.x = 1;
        } else if (this.cursors.left.isDown) {
            // this.left += this.direction * -1;
            if (this.body.velocity.x >= -100) {
                this.body.velocity.x -= this.direction;
            }
            if (this.touchingGround) {
                this.animations.play('run');
            }
            this.scale.x = -1;
        } else {
            this.body.velocity.x = this.body.velocity.x * 0.75;
            this.animations.stop();
            this.frame = 1;
        }

        // if (this.cursors.down.isDown) {
        //     //this.top += this.direction;
        //     this.body.velocity.y += this.direction;
        // }

        if (this.cursors.up.isDown && this.touchingGround) {
            // this.top += this.direction * -1;
            this.body.velocity.y -= 200;
            this.animations.play('jump');
        }

        if (this.body.velocity.y > 0) {
            this.isFalling = true;
        }
    }

    setUpAnimations() {
        this.animations.add('walk', [1,2,3,4], 10, false);
        this.animations.add('run', [14,15,17], 10, false);
        this.animations.add('jump', [4,5], 10, false);
        this.animations.add('falling', [5,7], 10, false);
    }
}
