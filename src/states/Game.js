/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
   // const bannerText = 'Phaser + ES6 + Webpack'
   // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
   // banner.font = 'Bangers'
   // banner.padding.set(10, 16)
   // banner.fontSize = 40
   // banner.fill = '#77BFA3'
   // banner.smoothed = false
   // banner.anchor.setTo(0.5)

		let tileMap = this.game.add.tilemap('tile_map');
		tileMap.addTilesetImage('tile_jungle_bottom_brown', 'tile_jungle_bottom');
		tileMap.addTilesetImage('tile_jungle_ground_brown', 'tile_jungle_ground');
		tileMap.addTilesetImage('tile_jungle_wall_brown', 'tile_jungle_wall');

		let backgroundLayer = tileMap.createLayer('backgroundLayer');
		backgroundLayer.resizeWorld();

		let blockingLayer = tileMap.createLayer('blockingLayer');
		this.map.setCollisionBetween(1, 2000, true, 'blockingLayer');

    this.mushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
