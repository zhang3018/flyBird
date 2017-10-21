cc.Class({
    extends: cc.Component,

    properties: {
        accSpeed: 0,
        maxSpeed: 0,
        tapAudio: {
            default: null,
            url: cc.AudioClip
        },
        dieAudio: {
            default: null,
            url: cc.AudioClip
        },
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
        animAudio: {
            default: null,
            url: cc.AudioClip
        },
        Score: cc.Node,
        land1: cc.Node,
        land2: cc.Node,
        pipes: [cc.Node],
        getReady: cc.Node,
        tip: cc.Node,
        bird: cc.Node,
        score0: cc.SpriteFrame,
        score1: cc.SpriteFrame,
        score2: cc.SpriteFrame,
        score3: cc.SpriteFrame,
        score4: cc.SpriteFrame,
        score5: cc.SpriteFrame,
        score6: cc.SpriteFrame,
        score7: cc.SpriteFrame,
        score8: cc.SpriteFrame,
        score9: cc.SpriteFrame,
    },

    // use this for initialization
    onLoad: function () {
        this.initPipePosition(this.pipes[0], this.pipes[1]);
        this.initPipePosition(this.pipes[2], this.pipes[3]);
        this.initPipePosition(this.pipes[4], this.pipes[5]);

        this.node.on('mousedown', this.onFadeOut, this);
        this.node.on('touchstart', this.onFadeOut, this);

        this.speed = -100;
        this.score = 0;

        this.begain = false;
        this.over = true;
        this.pipeActive = false;

        this.pipeKey1 = true;
        this.pipeKey2 = false;
        this.pipeKey3 = false;
        this.dieAud = true;
        
    },

    onAction: function () {
        var landMove = cc.moveTo(4, -750, -542);
        var anim = cc.sequence(landMove, cc.callFunc(this.landChangeX, this));
        this.land1.runAction(anim);
        var landMove = cc.moveTo(8, -750, -542);
        var anim = cc.sequence(landMove, cc.callFunc(this.landChangeX, this));
        this.land2.runAction(anim);

        var pipeMove = cc.moveBy(4.8, -900, 0);
        var anim = cc.sequence(pipeMove, cc.callFunc(this.pipeChangeX, this));
        this.pipes[0].runAction(anim);
        var pipeMove = cc.moveBy(4.8, -900, 0);
        var anim = cc.sequence(pipeMove, cc.callFunc(this.pipeChangeX, this));
        this.pipes[1].runAction(anim);
        var pipeMove = cc.moveBy(6.8, -1275, 0);
        var anim = cc.sequence(pipeMove, cc.callFunc(this.pipeChangeX, this));
        this.pipes[2].runAction(anim);
        var pipeMove = cc.moveBy(6.8, -1275, 0);
        var anim = cc.sequence(pipeMove, cc.callFunc(this.pipeChangeX, this));
        this.pipes[3].runAction(anim);
        var pipeMove = cc.moveBy(8.8, -1650, 0);
        var anim = cc.sequence(pipeMove, cc.callFunc(this.pipeChangeX, this));
        this.pipes[4].runAction(anim);
        var pipeMove = cc.moveBy(8.8, -1650, 0);
        var anim = cc.sequence(pipeMove, cc.callFunc(this.pipeChangeX, this));
        this.pipes[5].runAction(anim);

    },

    initPipePosition: function (pipeDown,pipeUp) {
        pipeDown.y = cc.random0To1() * 500 + 220;
        pipeUp.y = pipeDown.y - cc.random0To1() * 150-950;
    },


    landChangeX: function (target) {
        target.x = 750;
        var landMove = cc.moveTo(8, -750, -542);
        var anim = cc.sequence(landMove, cc.callFunc(this.landChangeX, this));
        target.runAction(anim);
    },
    cancelAnim: function () {
        this.node.off('mousedown', this.onMousedown, this);
        this.node.off('touchstart', this.onMousedown, this);
        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].stopAllActions();
        };
        this.land1.stopAllActions();
        this.land2.stopAllActions();
        this.bird.stopAllActions(); 
        this.detail = this.node.getChildByName('detail');
        this.Score.parent = this.detail;
        this.Score.setPosition(155, 30);
        this.Score.setScale(0.5, 0.5);
    },

    pipeChangeX: function (target) {
        target.x = -150;
        var pipeMove = cc.moveBy(6, -1125, 0);
        var anim = cc.sequence(pipeMove, cc.callFunc(this.pipeChangeX, this));
        target.runAction(anim);
    },

    onFadeOut: function () {
        cc.audioEngine.playEffect(this.tapAudio, false);

        this.getReady.runAction(cc.fadeOut(0.3));
        this.tip.runAction(cc.fadeOut(0.3));

        this.onAction();

        
        this.begain = true;
        this.node.off('mousedown', this.onFadeOut, this);
        this.node.off('touchstart', this.onFadeOut, this);

        this.node.on('mousedown', this.onMousedown, this);
        this.node.on('touchstart', this.onMousedown, this);
    },

    onMousedown: function () {
        cc.audioEngine.playEffect(this.tapAudio, false);

        this.begain = false;
        this.bird.runAction(cc.moveBy(0.2, 0, 40).easing(cc.easeCubicActionOut()));
        this.bird.getComponent(cc.Animation).play('birdRotateAnim1');
        this.bird.getComponent(cc.Animation).play('birdRotateAnim2');

        this.speed = -100;
        this.begain = true;


    },

    gameOver: function () {
        var gameOver = this.node.getChildByName('gameOver');
        cc.audioEngine.playEffect(this.animAudio, false);
        gameOver.active = true;
        gameOver.runAction(cc.sequence(cc.moveBy(0.1, 0, 10), cc.moveBy(0.1, 0, -10)));
        
        this.detail.runAction(cc.moveTo(0.4, 0, -22));
        var play = this.node.getChildByName('play');
        this.scheduleOnce(function () {
            play.active = true;
        }, 0.5);
        
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var self = this;
        if (this.begain) {
            this.speed += this.accSpeed * this.accSpeed * dt;
            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed;
            };

            this.bird.y -= this.speed * dt;
        };

        if (this.bird.y <= -430 && this.over) {
            if (this.dieAud) {
                cc.audioEngine.playEffect(this.dieAudio, false);
                this.dieAud = true;
            };
            this.begain = false;
            this.over = false;
            this.cancelAnim();
            this.gameOver();
            
            
        };

        //判断是否通过管道
        if (this.pipes[0].x <= -1000 && this.pipeKey1) {
            this.pipeKey1 = false;
            this.pipeKey2 = true;
            this.score++;
            this.showScore();
            cc.audioEngine.playEffect(this.scoreAudio, false);
        };
        if (this.pipes[2].x <= -1000 && this.pipeKey2) {
            this.pipeKey2 = false;
            this.pipeKey3 = true;
            this.score++;
            this.showScore();
            cc.audioEngine.playEffect(this.scoreAudio, false);
        };
        if (this.pipes[4].x <= -1000 && this.pipeKey3) {
            this.pipeKey3 = false;
            this.pipeKey1 = true;
            this.score++;
            this.showScore();
            cc.audioEngine.playEffect(this.scoreAudio, false);
        };


    },

    showScore: function () {
        if (this.score >= 100) {
            var scoreArr = [];
            scoreArr[0] = Math.floor(this.score % 1000 / 100);
            scoreArr[1] = Math.floor(this.score % 1000 % 100 / 10);
            scoreArr[2] = this.score % 1000 % 100 % 10;
            if (this.Score.childrenCount<3) {
                for (let i = 0; i < 3 - this.Score.childrenCount; i++) {
                    var sprite = new cc.Node;
                    sprite.addComponent(cc.Sprite);
                    this.Score.addChild(sprite);
                };
            };
            var scores = this.Score.children;
            for (let i = 0; i < 3; i++) {
                scores[i].getComponent(cc.Sprite).spriteFrame = this.getSpriteFrame(scoreArr[i]);
                scores[i].width = 60;
                scores[i].height = 90;
                scores[i].x = -60 + i * 60;
            };
        } else if (this.score >= 10) {
            var scoreArr = [];
            scoreArr[0] = Math.floor(this.score % 1000 % 100 / 10);
            scoreArr[1] = this.score % 1000 % 100 % 10;
            if (this.Score.childrenCount < 2) {
                for (let i = 0; i < 3 - this.Score.childrenCount; i++) {
                    var sprite = new cc.Node;
                    sprite.addComponent(cc.Sprite);
                    this.Score.addChild(sprite);
                };
            };
            var scores = this.Score.children;
            for (let i = 0; i < 2; i++) {
                scores[i].getComponent(cc.Sprite).spriteFrame = this.getSpriteFrame(scoreArr[i]);
                scores[i].width = 60;
                scores[i].height = 90;
                scores[i].x = -30 + i * 60;
            };
        } else if (this.score >= 0) {
            if (this.Score.childrenCount == 0) {
                    var sprite = new cc.Node;
                    sprite.addComponent(cc.Sprite);
                    this.Score.addChild(sprite);
                    sprite.width = 60;
                    sprite.height = 90;
            };
            this.Score.children[0].getComponent(cc.Sprite).spriteFrame  = this.getSpriteFrame(this.score);
        };

    },

    getSpriteFrame: function (num) {
        switch (num) {
            case 0: return this.score0; break;
            case 1: return this.score1; break;
            case 2: return this.score2; break;
            case 3: return this.score3; break;
            case 4: return this.score4; break;
            case 5: return this.score5; break;
            case 6: return this.score6; break;
            case 7: return this.score7; break;
            case 8: return this.score8; break;
            case 9: return this.score9; break;
        };
    },
});
