(function(root) {


    var Obstacles = HelicopterGame.Entity.extend({

        // public properties
        view: null,
        body: null,
        physics: null,

        imageWM:null,
        arrayOfObstacles:null,

        isPlaying:true,
        counter:0,

        init: function(){

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

            this.body = new HelicopterGame.Body(this);
            this.body.x = -30;
            this.body.y = 0;
            this.body.rotation = (90 * Math.PI * 2) - Math.PI;
            this.setBody(this.body);

            this.physics = this.getPhysics();
            this.physics = new HelicopterGame.Physics(this);

            this.view = this.getView();
            this.view = new HelicopterGame.View();
            this.view.alpha =1;

            this.imageWM = new Image();
            this.imageWM.src= "images/wm.png";

            this.arrayOfObstacles = [
                {
                    "boxes": [1,1,1,0,0,0,0,1,1],
                    "xPos": 1200
                },
                {
                    "boxes": [0,0,0,0,0,0,0,1,0],
                    "xPos": 1600
                },
                {
                    "boxes": [0,0,0,0,1,1,0,0,0],
                    "xPos": 1900
                },
                {
                    "boxes": [0,1,1,0,0,0,0,0,0],
                    "xPos": 2400
                },
                {
                    "boxes": [0,0,0,0,1,0,0,0,0],
                    "xPos": 3000
                },
                {
                    "boxes": [1,1,1,0,0,0,0,0,0],
                    "xPos": 3600
                },
                {
                    "boxes": [0,0,0,1,1,1,0,0,0],
                    "xPos": 4000
                },
                {
                    "boxes": [0,1,1,0,,0,0,0,0],
                    "xPos": 4600
                },
                {
                    "boxes": [0,0,0,0,0,1,1,0,0],
                    "xPos": 4900
                },
                {
                    "boxes": [1,0,0,1,1,1,0,0,0],
                    "xPos": 5500
                },
                {
                    "boxes": [0,1,1,1,1,0,0,0,0],
                    "xPos": 6000
                },
                {
                    "boxes": [0,0,0,0,1,1,1,1,0],
                    "xPos": 6500
                },
                {
                    "boxes": [1,0,0,0,1,1,1,0,0],
                    "xPos": 6800
                },
                {
                    "boxes": [0,0,1,1,1,0,0,0,0],
                    "xPos": 7100
                },
                {
                    "boxes": [1,1,0,0,0,0,1,1,1],
                    "xPos": 7500
                }
            ];

            var that = this;

            this.view.spritePainter = {


                paint:function(sprite,context){

                    var obj;
                    var length = that.arrayOfObstacles.length;

                    for (i = 0; i < length; i++) {
                        obj = that.arrayOfObstacles[i];

                        that.view.local(that.body.x, that.body.y);
                        console.log(obj.boxes.length);

                        var l = obj.boxes.length;
                        var yPos;
                        for (n = 0; n < l; n++) {
                            yPos = n*51;
                            if(obj.boxes[n]===1) that.view.drawImage(that.imageWM, obj.xPos, yPos, that.imageWM.width, that.imageWM.height);


                        }

                        that.view.unlocal();


                    }
                    


                    /*
                    if(that.imageWM.complete){

                        that.view.local(that.body.x, that.body.y);
                        that.view.drawImage(that.imageWM, -that.imageWM.width/2, 0, that.imageWM.width, that.imageWM.height);
                        that.view.drawImage(that.imageWM, -that.imageWM.width/2, 51, that.imageWM.width, that.imageWM.height);
                        that.view.drawImage(that.imageWM, -that.imageWM.width/2, 102, that.imageWM.width, that.imageWM.height);
                        that.view.unlocal();
                    }
                    */

                }

            }

            this.view.sprite = new Sprite('Obstacles', this.view.spritePainter);
            console.log("painting the Obstacles sprite");
            this.view.spritePainter.paint(this.view.sprite, context);
        },

        render: function(){

            /*--o render - UPDATE VIEW
            Applying the new body variable to our view to draw the sprite on the context;
            */

            this.view.spritePainter.paint(this.view.sprite, context);
        },

        update: function(){

            /*--o update -  UPDATE BODY
            Applying the new physical changes to our body
            */

            if((that.counter%400===0) && that.counter >1) this.addObstacleItem();

            that.counter++;

            if(this.isPlaying) this.body.x -=3;
        },

        addObstacleItem: function(){
            // this.body.y = Math.round(Math.random()*500);
            // this.body.y = (yPos+11) + (Math.random()*height) - 11;
            // this.body.x = fullWidth;
        },

        powerUpToken: function(){
            // this.body.x = -30;
        },

        endGame: function(){
            this.isPlaying = false;
        }
    });

// Disabling these as collision detection code not done
// root.HelicopterGame.Obstacles = Obstacles;

})(window);
