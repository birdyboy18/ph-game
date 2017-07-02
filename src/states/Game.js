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
        this.game.physics.arcade.gravity.set(0,180);

        this.tileMap = this.game.add.tilemap('tile_map');
        this.tileMap.addTilesetImage('tile_jungle_bottom_brown', 'tile_jungle_bottom');
        this.tileMap.addTilesetImage('tile_jungle_ground_brown', 'tile_jungle_ground');
        this.tileMap.addTilesetImage('tile_jungle_wall_brown', 'tile_jungle_wall');

        this.backgroundLayer = this.tileMap.createLayer('backgroundLayer');
        this.backgroundLayer.resizeWorld();

        this.blockingLayer = this.tileMap.createLayer('blockingLayer');
        //this.tileMap.setCollisionBetween(1, 2000, true, 'blockingLayer');
        console.log(this.blockingLayer);

        this.character = new Character({
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY,
            asset: 'elf'
        })

        //this.game.add.existing(this.mushroom)
        this.game.add.existing(this.character);
        this.game.physics.arcade.collide(this.character, this.blockingLayer);
    }

    render () {
        if (__DEV__) {
            //this.game.debug.spriteInfo(this.mushroom, 32, 32)
        }
    }
}
