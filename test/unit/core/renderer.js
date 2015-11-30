suite('Renderer', function() {
  var myp5;

  setup(function() {
    myp5 = new p5(function( p ) {
      p.setup = function() {};
      p.draw = function() {};
    });
  });

  teardown(function(){
    myp5.remove();
  });

  suite('p5.prototype.resizeCanvas' , function() {
    test('should resize canvas', function() {
      myp5.resizeCanvas(10, 20);
      assert.equal(myp5.canvas.width, 10 * myp5.pixelDensity());
      assert.equal(myp5.canvas.height, 20 * myp5.pixelDensity());
    });

    test('should restore fill color', function() {
      myp5.strokeWeight(323);
      myp5.resizeCanvas(10, 10);
      assert.equal(myp5.drawingContext.lineWidth, 323);
    });

    test('should restore stroke color', function() {
      myp5.stroke('#f0f0f0');
      myp5.resizeCanvas(10, 10);
      assert.equal(myp5.drawingContext.strokeStyle, '#f0f0f0');
    });

    test('should restore stroke cap', function() {
      myp5.strokeCap(myp5.PROJECT);
      myp5.resizeCanvas(10, 10);
      assert.equal(myp5.drawingContext.lineCap, myp5.PROJECT);
    });

    test('should restore text style', function() {
      myp5.textSize(200);
      myp5.resizeCanvas(10, 10);
      assert.match(myp5.drawingContext.font, /200px/);
    });
  });

  suite('p5.prototype.blendMode', function() {
    var blendMode = p5.prototype.blendMode;
    var drawX = function() {
      myp5.strokeWeight(30);
      myp5.stroke(80, 150, 255);
      myp5.line(25, 25, 75, 75);
      myp5.stroke(255, 50, 50);
      myp5.line(75, 25, 25, 75);
    };
    suite('blendMode()', function() {
      test('should be a function', function() {
        assert.ok(blendMode);
        assert.typeOf(blendMode, 'function');
      });
      test('should be able to ADD', function() {
        myp5.blendMode(myp5.ADD);
        drawX();
      });
      test('should be able to MULTIPLY', function() {
        myp5.blendMode(myp5.MULTIPLY);
        drawX();
      });

    });
  });

});
