var bounds = require('binary-search-bounds')
var fs = require('fs');
var R = require('ramda');
var microtime = require('microtime');

var file = __dirname + '/done_perks.json';

fs.readFile(file, 'utf8', function (err, data) {
  var data = JSON.parse(data);

  var perksNames = R.pipe(
    R.pluck('displayName'),
    R.without([null, undefined, ''])
  )(data);

  console.dir("Linear search");
  var linearFilter = R.filter(function(x){return x.indexOf("Fallen") > -1;})
  var linearStart = microtime.now();
  var linearOutput = linearFilter(perksNames);
  var linearEnd = microtime.now();
  console.dir(linearOutput);
  console.dir(linearEnd - linearStart + " microseconds");

  var sortedPerksNames = R.sort(function(x, y) { return x.localeCompare(y); })(perksNames);

  console.dir("Binary search");
  var comp = function(x, y) {
    if(x.indexOf(y) > -1) {
      return 0;
    }

    return x.localeCompare(y);
  }

  var binaryStart = microtime.now();
  var top = bounds.gt(sortedPerksNames, "Fallen", comp);
  var bottom = bounds.lt(sortedPerksNames, "Fallen", comp) + 1;
  var slice = sortedPerksNames.slice(bottom, top);
  var binaryEnd = microtime.now();
  console.dir(slice);
  console.dir(binaryEnd - binaryStart + " microsends");
});
