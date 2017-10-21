cc.Class({
    extends: cc.Component,

    properties: {
        land1: cc.Node,
        land2: cc.Node,
        bird: cc.Node,
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
        var landMove = cc.moveBy(4, -750, 0);
        var anim = cc.sequence(landMove, cc.callFunc(this.landChangeX, this));
        this.land1.runAction(anim);

        var landMove = cc.moveBy(8, -1500, 0);
        var anim = cc.sequence(landMove, cc.callFunc(this.landChangeX, this));
        this.land2.runAction(anim);
    },


    landChangeX: function (target) {
        target.x = 750;
        var landMove = cc.moveBy(8, -1500, 0);
        var anim = cc.sequence(landMove, cc.callFunc(this.landChangeX, this));
        target.runAction(anim);
    },

    

    onBtnCliked: function () {
        cc.audioEngine.playEffect(this.animAudio, false);
        cc.audioEngine.playEffect(this.btnAudio, false);
        cc.director.loadScene('game');
    },
    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {

    //},
});
