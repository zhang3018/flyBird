const game = require('game');
cc.Class({
    extends: cc.Component,

    properties: {
        anim: cc.Animation,
        dieAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    onCollisionEnter: function (other) {
        cc.director.getCollisionManager().enabled = false;
        cc.audioEngine.playEffect(this.dieAudio, false);
        var gameScript = cc.find("Canvas").getComponent('game')
        gameScript.cancelAnim();
        gameScript.dieAud = false;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
