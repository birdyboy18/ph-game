import { Phaser } from 'phaser'

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
        this.facingDirection = 0;
        this.breatheTween = game.add.tween(this.scale).to({ y: 0.95 }, 500, Phaser.Easing.Sinusoidal.None, false, 0, 0, true);
        this.backflip = game.add.tween(this).to({ angle: 360 }, 1200, Phaser.Easing.Bounce.None, false, 0, 0, false);
        this.frontflip = game.add.tween(this).to({ angle: -360 }, 1200, Phaser.Easing.Bounce.None, false, 0, 0, false);
        this.createEmitters();
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
            this.facingDirection = 1;
            this.angle = -10;
        } else if (this.cursors.left.isDown) {
            // this.left += this.direction * -1;
            if (this.body.velocity.x >= -100) {
                this.body.velocity.x -= this.direction;
            }
            if (this.touchingGround) {
                this.animations.play('run');
            }
            this.scale.x = -1;
            this.facingDirection = -1;
            this.angle = 10;
        } else {
            this.body.velocity.x = this.body.velocity.x * 0.75;
            this.animations.stop();
            this.frame = 1;
            this.breatheTween.start();
            this.angle = 0;
        }

        if (this.cursors.up.isDown && this.touchingGround) {
            // this.top += this.direction * -1;
            this.body.velocity.y -= 200;
            this.animations.play('jump');
            if (this.facingDirection === 1) {
                this.frontflip.start();
            } else if (this.facingDirection === -1) {
                this.backflip.start();
            }
        }

        if (this.isFalling()) {
            this.frame = 7;
        }

        if (this.touchingGround) {
            this.emitter.x = this.x;
            this.emitter.y = this.y;
            this.emitter.start(true, 300, null, 10);
        }
    }

    setUpAnimations() {
        this.animations.add('walk', [1,2,3,4], 10, false);
        this.animations.add('run', [14,15,17], 10, false);
        this.animations.add('jump', [4,5], 10, false);
        this.animations.add('falling', [5,7], 10, false);
    }

    isFalling() {
        if (this.body.velocity.y > 0) {
            return true;
        } else {
            return false;
        }
    }

    createEmitters() {
        let bmd = this.game.add.bitmapData(3,3);
        this.drawSquare(bmd);
        this.emitter = this.game.add.emitter(0,this.height/2,10);
        this.emitter.lifespan = 300;
        this.emitter.makeParticles(bmd);
    }

    drawSquare(bmd) {
        bmd.ctx.fillStyle = 'white';
        bmd.ctx.fillRect(0,0,5,5);
    }
}
