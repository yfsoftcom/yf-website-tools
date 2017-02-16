'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicSpider = exports.DomXpathSelector = exports.WebXpathSelector = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _each = require('async/each');

var _each2 = _interopRequireDefault(_each);

var _DomXpathSelector = require('./DomXpathSelector');

var _DomXpathSelector2 = _interopRequireDefault(_DomXpathSelector);

var _WebXpathSelector = require('./WebXpathSelector');

var _WebXpathSelector2 = _interopRequireDefault(_WebXpathSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectConvert = function ObjectConvert(data) {
  var list = [];
  _lodash2.default.forEach(data, function (val, key) {
    _lodash2.default.forEach(val.result, function (v, i) {
      var o = {};
      o[key] = v;
      list[i] = _lodash2.default.assign(list[i], o);
    });
  });
  return list;
};

var singlePageSpider = function singlePageSpider(item, callback) {
  new _WebXpathSelector2.default(item.url).getSelector(item.options).then(function (selector) {
    var data = selector.select(item.xpaths);
    var options = _lodash2.default.assign({ convert: false }, item.options);
    if (options.convert) {
      data = ObjectConvert(data);
    }
    if (options.reject) {
      data = _lodash2.default.reject(data, options.reject);
    }
    item.data = data;
    callback();
  }).catch(function (err) {
    callback(err);
  });
};

var regPages = /\[(\d*)-(\d*)\]/g;

var BasicSpider = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url, xpaths, options) {
    var _ret;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!regPages.test(url)) {
              _context.next = 6;
              break;
            }

            _ret = function () {
              var placeholder = url.match(regPages)[0];
              var pages = '0 1 2 3 4 5 6 7 8 9'.match(new RegExp(placeholder, 'g'));
              var items = _lodash2.default.map(pages, function (p) {
                return { url: _lodash2.default.replace(url, placeholder, p),
                  xpaths: xpaths,
                  options: options
                };
              });
              return {
                v: new _promise2.default(function (resolve, reject) {
                  (0, _each2.default)(items, singlePageSpider, function (err) {
                    if (err) {
                      reject(err);
                    } else {
                      (function () {
                        var datas = [];
                        _lodash2.default.forEach(_lodash2.default.map(items, function (i) {
                          return i.data;
                        }), function (arr) {
                          datas = _lodash2.default.concat(datas, arr);
                        });
                        resolve(datas);
                      })();
                    }
                  });
                })
              };
            }();

            if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', _ret.v);

          case 4:
            _context.next = 7;
            break;

          case 6:
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              var item = { url: url, xpaths: xpaths, options: options };
              singlePageSpider(item, function (err) {
                if (err) {
                  reject(err);
                } else {
                  resolve(item.data);
                }
              });
            }));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function BasicSpider(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.WebXpathSelector = _WebXpathSelector2.default;
exports.DomXpathSelector = _DomXpathSelector2.default;
exports.BasicSpider = BasicSpider;