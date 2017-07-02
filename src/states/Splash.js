import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')

		// Load the tile images for the background
		this.load.tilemap('tile_map', './assets/tiles/ph-game-tiles.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tile_jungle_bottom', './assets/tiles/tile_jungle_bottom_brown.png');
		this.load.image('tile_jungle_ground', './assets/tiles/tile_jungle_ground_brown.png');
		this.load.image('tile_jungle_wall', './assets/tiles/tile_jungle_wall_brown.png');
  }

  create () {
    this.state.start('Game')
  }
}
