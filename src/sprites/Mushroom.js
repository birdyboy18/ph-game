import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.direction = 5;
    this.width = 64;
    this.height = 64;
  }

  update () {
    this.checkEdges()
  }

  checkEdges() {
      if (this.left + this.width >= this.game.world.bounds.width) {
          this.direction = this.direction * -1
      } else if (this.left <= 0) {
          this.direction = this.direction * -1
      }
      this.left += this.direction
  }
}
