(function(root) {

var Game = Class.extend({

    // public properties
    entities: [],
    isPaused: false,
    that: this,
    counter:0,

    _map: null,
    _powerUps: null,
    _helicopter:null,

    // constructor
    init: function()
    {
        that = this;

        // 01. Adding Views
        this.addMap();
        this.addObstacles();
        this.addPowerUps();
        this.addHelicopter();

        // 02. Setting up Collisions
        this._map.testCollision(this._helicopter);

        // 03. Start Rendering
        that.update();
        that.render();

        // @TODO: canvas, what goes here?
        // addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
    },

    loop: function()
    {


        that.update();
        that.render();
        requestAnimationFrame(that.loop);
    },
    updateCounter : 0,
    update: function()
    {

        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0, l = this.entities.length; i < l; i++) {
            this.entities[i].update();
        }

        if(this._map.isGameOver()){
            this.endGame();
            that.isPaused = true;
        }

        console.log("Counter:"+this.updateCounter);

        if((this.updateCounter%650===0) && this.updateCounter >1){
            console.log("ADDED FUEL ITEMADDED FUEL ITEMADDED FUEL ITEMADDED FUEL ITEMADDED FUEL ITEMADDED FUEL ITEMADDED FUEL ITEM");
            this._powerUps.addFuelItem(this._map.lastYPos, this._map.lastHeight);
        }

        if(this._helicopter.getBody().testCollision(this._powerUps)){
            this._powerUps.powerUpToken();
            //UI.fillupfuel;
            HelicopterGame.UI.displayFuel(false);
            console.log('powerUp taken');
        }

        if ( !that.isPaused ){
            HelicopterGame.UI.displayFuel(true);
            if(HelicopterGame.UI.getFuel()<1) this._helicopter.endFuel();
        }

        ++this.counter;
        ++this.updateCounter;
    },

    render: function()
    {
        this.drawBackground();
        for (var i = 0, l = this.entities.length; i < l; i++) {
            this.entities[i].render();
        }
    },

    onAddedToStage: function()
    {
        // @TODO: canvas, what goes here?
    },

    startGame: function()
    {
        console.log('startGame');
        this.loop();

    },
    stopGame: function()
    {
        for (var i = 0, l = this.entities.length; i < l; i++) {
            var entView = this.entities[i].entity.getView();
            if ( entView) {
                // @TODO: what goes here for canvas?
                // removeChild( entView.sprite );
            }
        }
    },

    endGame: function(){
        if ( that.isPaused ) return;
        this._map.endGame();
        this._powerUps.endGame();
        this._helicopter.endGame();

        HelicopterGame.UI.showEnd();
    },

    addEntity: function(entity)
    {
        this.entities.push(entity);
        // @TODO: do we want to order by z-index here?
        /*
        entity.sub('destroyed', function(destroyedEntity) {
            this.onEntityDestroyed( destroyedEntity );
        });
        */

        if ( entity.getView() ) {
        }

        return entity;
    },

    onEntityDestroyed: function(entity)
    {
        this.entities.splice( entities.indexOf( entity ), 1 );

        if ( entity.getView() ) {
        }
    },

    drawBackground: function(){
        context.fillStyle = '#6cc4da';
        context.fillRect(0,0,fullWidth,fullHeight);
    },

    addMap:function(){
        this._map = new HelicopterGame.Map();
        this.addEntity(this._map);

    },
    addObstacles:function () {
        this._obstacles = new HelicopterGame.Obstacles();
        this.addEntity(this._obstacles);
    },
    addPowerUps:function () {
        this._powerUps = new HelicopterGame.PowerUps();
        this.addEntity(this._powerUps);
    },
    addHelicopter: function(){
        //creating the player's ship
        this._helicopter = new HelicopterGame.Helicopter();
        this.addEntity(this._helicopter);

    }

});

root.HelicopterGame.Game = Game;

})(window);
