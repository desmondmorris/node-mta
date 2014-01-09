'use strict';

/**
 * merge helper function to merge objects
 * @param  {Object} defaults
 * @param  {Object} options
 * @return {Object}
 */
module.exports.merge = function (defaults, options) {
  defaults = defaults || {};
  if (options && typeof options === 'object') {
    var i = 0,
    keys = Object.keys(options);

    for (i = 0; i < keys.length; i += 1) {
      if (options[keys[i]] !== undefined) {
       defaults[keys[i]] = options[keys[i]];
      }
    }
  }
  return defaults;
};

/**
 * Recursively removes extraneous nested arrays from objects
 * @param  {Object|Array|String|Integer} obj
 * @return {Object}
 */
var arrayClean = function (obj) {
  var ret = {};

  if( Object.prototype.toString.call(obj) === '[object Object]' ) {
    for (var key in obj) {
      ret[key] = arrayClean(obj[key]);
    }
  }
  else if( Object.prototype.toString.call(obj) === '[object Array]' ) {
    if (obj.length === 1) {
      ret = arrayClean(obj[0]);
    }
    else {
      ret = new Array;
      for(var i=0;i<obj.length;i++) {
        ret.push(arrayClean(obj[i]));
      }
    }
  }
  else {
    ret = obj;
  }
  return ret;
}

module.exports.arrayClean = arrayClean;
