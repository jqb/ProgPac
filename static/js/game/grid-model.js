var GridModel = (function () {
  var defaults = {
  }
  return function () {
    this.data = {};
    this.defaultDrawable = [];
    this.cellGetter = (function (that) {
      var draw = function (ctx, r, c, x, y, w, h) {
	that.each(r, c, function (drawable) {
	  drawable.draw(ctx, r, c, x, y, w, h);
	});
      }
      return {
	get: function (r, c) {
	  return draw;
	}
      }
    })(this);
  }
})();


GridModel.method('set', function (row, col, item) {
  if (this.data[row] === undefined)
    this.data[row] = {}

  this.data[row][col] = item;
  return this;
});


GridModel.method('addDefault', function (item) {
  this.defaultDrawable.push(item);
  return this;
});


GridModel.method('each', function (r, c, func) {
  for (var i = 0; i < this.defaultDrawable.length; i += 1)
    func(this.defaultDrawable[i]);

  var rows = this.data[r]
  if (rows === undefined)
    return;

  var item = rows[c];
  if (item !== undefined) {
    func(item);
  }
});


GridModel.method('visit', function (row, col) {
  if (this.data[row] === undefined)
    return 0;

  if (this.data[row][col] === undefined)
    return 0;

  var item = this.data[row][col];
  if (item.visit !== undefined && ! this.visited)
    return item.visit();

  return 0;
});
