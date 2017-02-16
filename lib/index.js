'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicSpider = exports.baidu = undefined;

var _baidu = require('./baidu');

var baidu = _interopRequireWildcard(_baidu);

var _tool = require('./tool');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.baidu = baidu;
exports.BasicSpider = _tool.BasicSpider;