/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Character from '../sprites/Character'

export default class extends Phaser.State {
    init () {}
    preload () {}

    create () {
        let tileMap = this.game.add.tilemap('tile_map');
        tileMap.addTilesetImage('tile_jungle_bottom_brown', 'tile_jungle_bottom');
        tileMap.addTilesetImage('tile_jungle_ground_brown', 'tile_jungle_ground');
        tileMap.addTilesetImage('tile_jungle_wall_brown', 'tile_jungle_wall');

        let backgroundLayer = tileMap.createLayer('backgroundLayer');
        backgroundLayer.resizeWorld();

        let blockingLayer = tileMap.createLayer('blockingLayer');
        tileMap.setCollisionBetween(1, 2000, true, 'blockingLayer');

        this.character = new Character({
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY,
            asset: 'character'
        })

        //this.game.add.existing(this.mushroom)
        this.game.add.existing(this.character);
    }

    render () {
        if (__DEV__) {
            //this.game.debug.spriteInfo(this.mushroom, 32, 32)
        }
    }
}
