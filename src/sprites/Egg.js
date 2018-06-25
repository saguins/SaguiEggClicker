class Egg extends Phaser.Sprite {
    constructor({ game, x, y, asset }) {
        super(game, x, y, asset)
        this.anchor.setTo(0.5)

        this.animations.add('click', [0, 1, 2, 0]);
    }

    click(){
        this.animations.play('click', 10, false);
    }
}

export default Egg;