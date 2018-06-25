import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.background = this.add.sprite(0, 0, 'background')
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('eggsprite', './images/egg-Sheet.png', 220, 286, 3)
    this.load.spritesheet('warm', './images/button-warm.png', 80, 85, 2)
    this.load.spritesheet('water', './images/button-water.png', 80, 85, 2)
    this.load.spritesheet('clean', './images/button-clean.png', 80, 85, 2)
    this.load.spritesheet('music', './images/button-music.png', 80, 85, 2)
    this.load.spritesheet('love', './images/love.png', 75, 105, 2)
    this.load.spritesheet('angry', './images/angry.png', 75, 105, 2)
    this.load.image('bar', './images/bar.png')
  }

  create () {
    this.state.start('Game')
  }
}
