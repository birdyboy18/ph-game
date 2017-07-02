import { Phaser, Input } from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset, 1)
    this.anchor.setTo(0.5)
    this.speed = 2;
    this.direction = this.speed;
    this.setUpKeyboard();
  }

  update () {
    this.handleMove();
  }

  setUpKeyboard() {
    this.cursors = game.input.keyboard.createCursorKeys();
    console.log(game.input.keyboard);
  }

  handleMove() {
      if (this.cursors.right.isDown) {
          this.left += this.direction;
      }

      if (this.cursors.left.isDown) {
          this.left += this.direction * -1;
      }

      if (this.cursors.down.isDown) {
          this.top += this.direction;
      }

      if (this.cursors.up.isDown) {
          this.top += this.direction * -1;
      }
  }
}
