cc.Class({
    extends: cc.Component,

    properties: {
        btnAudio: {
            default: null,
            url: cc.AudioClip
        },
        animAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {
        this.moveLength = 3;
        this.birdAnim();
        var animation = this.node.getComponent(cc.Animation);
        animation.play('birdAnim');
    },

    birdAnim: function () {
        let upAnim = cc.moveBy(0.9, 0, 30 + this.moveLength).easing(cc.easeOut(1.1));
        let downAnim = cc.moveBy(0.9, 0, -30 + this.moveLength).easing(cc.easeOut(1.1));
        let birdAnim = cc.sequence(upAnim, downAnim, cc.callFunc(this.birdChangeY, this));

        this.node.runAction(birdAnim);
    },

    birdChangeY: function () {
        this.birdAnim();
    },

    onPicked: function () {
        cc.audioEngine.playEffect(this.btnAudio, false);
        cc.audioEngine.playEffect(this.animAudio, false);
        cc.director.loadScene('game');
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
