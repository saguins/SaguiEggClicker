/* globals __DEV__ */
import Phaser from 'phaser'
import Bar from '../sprites/Bar'
import Egg from '../sprites/Egg'
import Emotion from '../sprites/Emotion'

var warm
var water
var clean
var music

var guage = 0
var guageText

var token = 3
var tokenFull = true
var tokenText

var fillText
var time = 500

class Game extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.background = this.add.sprite(0, 0, 'background')

    this.egg = new Egg({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'eggsprite'
    })
    this.game.add.existing(this.egg)

    this.angry = new Emotion({
      game: this.game,
      x: 270,
      y: 80,
      asset: 'angry'
    })
    this.game.add.existing(this.angry)
    this.angry.visible = false

    this.love = new Emotion({
      game: this.game,
      x: 270,
      y: 80,
      asset: 'love'
    })
    this.game.add.existing(this.love)
    this.love.visible = false

    this.bar = new Bar({
      game: this.game,
      x: 55,
      y: 40,
      asset: 'bar'
    })
    this.game.add.existing(this.bar)

    warm = game.add.button(25, 495, 'warm', this.plusLife, this, 0, 0, 1)
    water = game.add.button(115, 495, 'water', this.plusLife, this, 0, 0, 1)
    clean = game.add.button(205, 495, 'clean', this.cropLife, this, 0, 0, 1)
    music = game.add.button(295, 495, 'music', this.cropLife, this, 0, 0, 1)

    var bmd = this.game.add.bitmapData(205, 20)
    bmd.ctx.beginPath()
    bmd.ctx.rect(0, 0, 300, 80)
    bmd.ctx.fillStyle = '#2baf2b'
    bmd.ctx.fill()

    var bglife = this.game.add.sprite(90, 45, bmd)

    this.widthLife = new Phaser.Rectangle(0, 0, bmd.width, bmd.height)
    this.totalLife = bmd.width

    this.life = this.game.add.sprite(90, 45, bmd)
    this.life.cropEnabled = true
    this.life.crop(this.widthLife)

    this.widthLife.width = this.widthLife.width / 2

    this.game.time.events.loop(5000, this.clickEgg, this)

    tokenText = this.add.text(20, 440, 'Token : 3', { fontSize: '28px', fill: '#FFF'})

    fillText = this.add.text(200, 450, 'Next Token in : ', { fontSize: '20px', fill: '#FFF'})
    fillText.visible = false
  }

  render() {
    this.life.updateCrop()
    if(tokenFull==false){
      if(token<3){
        time--
        fillText.visible = true
        fillText.setText('Next Token in : '+time)
        if(time==0){
          fillText.visible = false
          this.restoreEnergy()
        }
      }
    }
    /*if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }*/
  }

  cropLife() {
    if (this.widthLife.width <= 0) {
      this.widthLife.width = 0;
    } else {
      this.game.add.tween(this.widthLife).to({ width: (this.widthLife.width - (this.totalLife / 41)) }, 200, Phaser.Easing.Linear.None, true)
    }
    this.displayStatus()
    console.log('Guage : ' + Math.floor(Math.floor(this.widthLife.width) / 2.05)+' (-)')
    token--
    tokenFull = false
    tokenText.setText('Token : '+token)
  }

  plusLife() {
    if (this.widthLife.width >= 205) {
      this.widthLife.width = 205;
    } else {
      this.game.add.tween(this.widthLife).to({ width: (this.widthLife.width + (this.totalLife / 41)) }, 200, Phaser.Easing.Linear.None, true)
    }
    this.displayStatus()
    console.log('Guage : ' + Math.floor(Math.floor(this.widthLife.width) / 2.05)+' (+)')
    token--
    tokenFull = false
    tokenText.setText('Token : '+token)
    if(token==0){
      this.inCoolDown()
    }
  }

  displayStatus(){
    if (Math.floor(Math.floor(this.widthLife.width) / 2.05) < 40) {
      console.log('Status : UNHAPPY')
      this.angry.visible = true
      this.love.visible = false
    } else if (Math.floor(Math.floor(this.widthLife.width) / 2.05) < 60) {
      console.log('Status : NORMAL')
      this.angry.visible = false
      this.love.visible = false
    } else {
      console.log('Status : HAPPY!')
      this.angry.visible = false
      this.love.visible = true
    }
  }

  clickEgg() {
    this.egg.click()
  }

  inCoolDown() {
    console.log('Skill : COOLDOWN!')
    warm.tint = 0x727272
    water.tint = 0x727272
    clean.tint = 0x727272
    music.tint = 0x727272
    warm.inputEnabled = false
    water.inputEnabled = false
    clean.inputEnabled = false
    music.inputEnabled = false
  }

  outCoolDown() {
    console.log('Skill : OUTCOOLDOWN!')
    warm.tint = 0xFFFFFF
    water.tint = 0xFFFFFF
    clean.tint = 0xFFFFFF
    music.tint = 0xFFFFFF
    warm.inputEnabled = true
    water.inputEnabled = true
    clean.inputEnabled = true
    music.inputEnabled = true
  }

  restoreEnergy(){
    token++
    tokenText.setText('Token : '+token)
    console.log('Token Refill!')
    if(token==1){
      this.outCoolDown()
    }
    time = 500
  }
}
export default Game;