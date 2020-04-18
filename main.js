
      var CIRCLE = Math.PI * 2;
      

      var rainON = false;
      var lightningON = false;
      var showEgo = false;
      //var shiftOn = false;

     

      function Bitmap(src, width, height) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
      }
      
     

      function GameLoop() {
        this.frame = this.frame.bind(this);
        this.lastTime = 0;
        this.callback = function() {};
      }

      GameLoop.prototype.start = function(callback) {
        this.callback = callback;
        requestAnimationFrame(this.frame);
      };

      GameLoop.prototype.frame = function(time) {
        var seconds = (time - this.lastTime) / 1000;
        this.lastTime = time;
        if (seconds < 0.2) this.callback(seconds);
        requestAnimationFrame(this.frame);
      };

      var display = document.getElementById('display');
      var player = new Player(2, 2, 0);
      var map = new Map(32);
      var controls = new Controls();
      var camera = new Camera(display, 320, 0.8);
      var loop = new GameLoop();

      //map.randomize();
      
      loop.start(function frame(seconds) {
        map.update(seconds);
        player.update(controls.states, map, seconds);
        camera.render(player, map);
      });
