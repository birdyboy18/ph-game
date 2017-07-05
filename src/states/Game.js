/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Character from '../sprites/Character'

export default class extends Phaser.State {
    init () {}
    preload () {}

    create () {
        //add physics to the game
        //set global gravity
        this.game.physics.arcade.gravity.set(0,300);

        this.game.tileMap = this.game.add.tilemap('tile_map');
        this.game.tileMap.addTilesetImage('tile_jungle_bottom_brown', 'tile_jungle_bottom');
        this.game.tileMap.addTilesetImage('tile_jungle_ground_brown', 'tile_jungle_ground');
        this.game.tileMap.addTilesetImage('tile_jungle_wall_brown', 'tile_jungle_wall');

        this.game.backgroundLayer = this.game.tileMap.createLayer('backgroundLayer');
        this.game.backgroundLayer.resizeWorld();

        this.game.blockingLayer = this.game.tileMap.createLayer('blockingLayer');
        this.game.tileMap.setCollisionBetween(1, 2000, true, 'blockingLayer');

        this.character = new Character({
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY,
            asset: 'king'
        })

        //this.game.add.existing(this.mushroom)
        this.game.add.existing(this.character);
        //this.game.physics.arcade.collide(this.character, this.blockingLayer);
    }

    render () {
        if (__DEV__) {
            //this.game.debug.spriteInfo(this.mushroom, 32, 32)
        }
    }
}
