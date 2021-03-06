'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pusher = exports.spider = undefined;

var _spider = require('./spider');

var spider = _interopRequireWildcard(_spider);

var _pusher = require('./pusher');

var pusher = _interopRequireWildcard(_pusher);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.spider = spider;
exports.pusher = pusher;