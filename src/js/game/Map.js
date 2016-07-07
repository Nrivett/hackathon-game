(function(root) {


    var Map = HelicopterGame.Entity.extend({

        // public properties
        view: null,
        body: null,
        physics: null,

        color: '#FFFFFF',
        wallBlockWidth: 4,
        wallBlocksArray: [],
        counter:0,
        level:2,
        levelFrequency:2000,
        levelIncreament:1100,

        heightReductionByLevel: 0,

        sineWaveCounter: 0,
        sineWaveIncrease: 0,
        lastYPos:300,
        lastHeight:300,

        _helicopter: undefined,
        isPlaying: true,

        imageTree: new Image(),
        imageNearTree: new Image(),
        imageGrass: new Image(),
        imageGrass2: new Image(),
        imageSky: new Image(),

        imageTreeUrl: 'http://corehtml5canvas.com/code-live//shared/images/smalltree.png',
        imageNearTreeUrl: 'http://corehtml5canvas.com/code-live//shared/images/tree-twotrunks.png',
        imageGrassUrl: 'http://corehtml5canvas.com/code-live//shared/images/grass.png',
        imageGrass2Url: 'http://corehtml5canvas.com/code-live//shared/images/grass2.png',
        imageSkyUrl: 'http://corehtml5canvas.com/code-live//shared/images/sky.png',

        fps: 60,

        skyOffset: 0,
        grassOffset: 0,
        treeOffset: 0,
        nearTreeOffset: 0,

        TREE_VELOCITY: 120,
        FAST_TREE_VELOCITY: 140,
        SKY_VELOCITY: 108,
        GRASS_VELOCITY: 275,



        // constructor
        init: function()
        {
            this.sineWaveIncrease= Math.PI * 2 / (400-(this.level*30));

            /*
             *BODY: x, y , angle(rotate) etc.
            * If you give an entity a body it can take physical form in the world,
            * although to see it you will need a view.
            *
            *VIEW: sprite and its alpha, scale, color etc. and set the Body's x,y,angle variables
            * View is display component which renders an Entity using the standard display list.
             *
             *PHYSICS: mr, mx, my, speed-> writes the Body's x,y,angle variables so that view can read
              * Provides a basic physics step without collision detection.
             * Extend to add collision handling.
            */

            this.body = this.getBody();
            this.body = new HelicopterGame.Body(this);
            this.body.rotation = 0;
            this.body.radius = 20;


            this.physics = new this.getPhysics();
            this.physics = new HelicopterGame.Physics(this);
            this.physics.mr = 0;
            this.physics.mx = (Math.random()*5)-3;
            this.physics.my = (Math.random()*5)-3;

            this.view = new this.getView();
            this.view = new HelicopterGame.View();
            this.view.alpha =1;



            this.imageTree.src = this.imageTreeUrl;
            this.imageNearTree.src = this.imageNearTreeUrl;
            this.imageGrass.src = this.imageGrassUrl;
            this.imageGrass2.src = this.imageGrass2Url;
            this.imageSky.src = this.imageSkyUrl;

            

            var that = this;





            var wallBlockObj;
            this.heightReductionByLevel = (this.level*40);
            var prevHeight= 585-this.heightReductionByLevel;

            for(i=0; i<(fullWidth/this.wallBlockWidth); i++){
                var newHeight = this.getNewHeightValue(prevHeight);
                var newYPos = this.getNewYPosValue(newHeight);

                wallBlockObj = {xPos:i*this.wallBlockWidth, yPos:newYPos, height:newHeight}
                this.wallBlocksArray.push(wallBlockObj);

                prevHeight = newHeight;
            }

            this.view.spritePainter = {

                paint: function (sprite, context, isWithNewWallObject) {
                    var wallBlockObj;

                    that.view.local(that.body.x, that.body.y);

                    // if(isWithNewWallObject){
                    //     that.wallBlocksArray.shift();
                    //     //console.log('new xPos : '+Number(that.wallArray[that.wallArray.length-1].xPos+that.wallBlockWidth))
                    //     var lastWallBlockObj = that.wallBlocksArray[that.wallBlocksArray.length-1];

                    //     var newHeight = that.getNewHeightValue(lastWallBlockObj.height);
                    //     var newYPos = that.getNewYPosValue(newHeight);
                    //     that.lastYPos = newYPos;
                    //     that.lastHeight = newHeight;

                    //     wallBlockObj = {xPos:lastWallBlockObj.xPos+that.wallBlockWidth, yPos:newYPos, height:newHeight}
                    //     that.wallBlocksArray.push(wallBlockObj);
                    // }




                    // for(var i=0; i<that.wallBlocksArray.length; i++){
                    //     wallBlockObj = that.wallBlocksArray[i];
                    //     that.view.fillRect(wallBlockObj.xPos, wallBlockObj.yPos, that.wallBlockWidth, wallBlockObj.height, that.color);
                    //     //if( (typeof that._helicopter!=='undefined')  && (that.counter%10===0) && (i%10===0)) console.log('wallBlockObj.xPos: '+(wallBlockObj.xPos+that.body.x)+ ' wallBlockObj.yPos: '+wallBlockObj.yPos+ '  helicopter.y: '+that._helicopter.body.y);
                    //     if((wallBlockObj.xPos+that.body.x)>232 && (wallBlockObj.xPos+that.body.x)<327){


                    //         if((typeof that._helicopter!=='undefined') && that._helicopter.body.y+20< wallBlockObj.yPos ){
                    //             // console.log('collision');
                    //             that.isPlaying=false;
                    //         }
                    //         if((typeof that._helicopter!=='undefined') && that._helicopter.body.y-5 > wallBlockObj.yPos+wallBlockObj.height ){
                    //             // console.log('collision');
                    //             that.isPlaying=false;
                    //         }
                    //     }

                    // }
                    


                    that.view.local(-that.skyOffset, 0);
                    that.view.drawImage(that.imageSky, 0, 0);
                    that.view.drawImage(that.imageSky, that.imageSky.width-2, 0);
                    that.view.unlocal();

                    that.view.local(-that.treeOffset, 0);
                    that.view.drawImage(that.imageTree, 100, 240);
                    that.view.drawImage(that.imageTree, 1100, 240);
                    that.view.drawImage(that.imageTree, 400, 240);
                    that.view.drawImage(that.imageTree, 1400, 240);
                    that.view.drawImage(that.imageTree, 700, 240);
                    that.view.drawImage(that.imageTree, 1700, 240);
                    that.view.unlocal();

                    that.view.local(-that.nearTreeOffset, 0);
                    that.view.drawImage(that.imageNearTree, 250, 220);
                    that.view.drawImage(that.imageNearTree, 1250, 220);
                    that.view.drawImage(that.imageNearTree, 800, 220);
                    that.view.drawImage(that.imageNearTree, 1800, 220);
                    that.view.unlocal();

                    that.view.local(-that.grassOffset, 0);
                    that.view.drawImage(that.imageGrass, 0, 550 - that.imageGrass.height);
                    that.view.drawImage(that.imageGrass, that.imageGrass.width-5, 550-that.imageGrass.height);
                    that.view.drawImage(that.imageGrass2, 0, 550 - that.imageGrass2.height);
                    that.view.drawImage(that.imageGrass2, that.imageGrass2.width, 550-that.imageGrass2.height);
                    that.view.unlocal();


                    that.view.local(that.body.x, that.body.y);
                    //power up

                    that.view.unlocal();

                }
            };
            this.view.sprite = new Sprite('map'+Math.random()*100, this.view.spritePainter);
            this.view.spritePainter.paint(this.view.sprite, context);

        },

        render: function(){

            /*--o render - UPDATE VIEW
            Applying the new body variable to our view to draw the sprite on the context;
            */

            if((this.body.x % this.wallBlockWidth) === 0 && this.body.x !==0 && this.isPlaying ){
                this.view.spritePainter.paint(this.view.sprite, context, true);
            }else{
                this.view.spritePainter.paint(this.view.sprite, context, false);
            }
        },

        update: function(){

            /*--o update -  UPDATE BODY
            Applying the new physical changes to our body
            */

            if(this.isPlaying){

                // this.body.x -= 4;
                
                this.skyOffset = (this.skyOffset < 995)? this.skyOffset + this.SKY_VELOCITY/this.fps : 0;
                this.grassOffset = (this.grassOffset < 995)? this.grassOffset +  this.GRASS_VELOCITY/this.fps : 0;
                this.treeOffset = (this.treeOffset < 995)? this.treeOffset + this.TREE_VELOCITY/this.fps : 0;
                this.nearTreeOffset = (this.nearTreeOffset < 995)? this.nearTreeOffset + this.FAST_TREE_VELOCITY/this.fps : 0;


                if((this.counter % this.levelFrequency)===0){
                    this.level++;
                    this.levelFrequency += this.levelIncreament;
                }

                this.counter++;

                HelicopterGame.UI.displayDistance(this.counter*0.1);

            }
        },

        getNewHeightValue: function(lastHeightValue){
            this.heightReductionByLevel = (this.level*40);

            var increament = 8;
            var newHeightValue;
            if(lastHeightValue>=(fullHeight-20)-this.heightReductionByLevel){
                newHeightValue =lastHeightValue-increament;
            }else if(lastHeightValue<(fullHeight-150)-this.heightReductionByLevel){
                newHeightValue =lastHeightValue+increament;
            }else{
                newHeightValue = ((Math.random()*1)>0.5)? lastHeightValue+increament : lastHeightValue-=increament;
            }
            return newHeightValue;
        },

        getNewYPosValue: function(height){
            var yPos = Math.sin(this.sineWaveCounter ) / 2 + 0.5;
            yPos = ((fullHeight-180)/2)+(yPos*180);
            this.sineWaveCounter += this.sineWaveIncrease;

            yPos -=(height/2);

            return yPos;
        },

        testCollision: function(helicopter){
            this._helicopter = helicopter
        },
        isGameOver: function(){
            return !this.isPlaying;
        },

        endGame: function () {
            this.isPlaying = false;
        }
    });

root.HelicopterGame.Map = Map;

})(window);