'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkKeywords = exports.checkKeyword = exports.checkSite = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _tool = require('../tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkSite = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(domain) {
    var error, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            error = void 0, data = void 0;
            _context.prev = 1;
            _context.next = 4;
            return (0, _tool.BasicSpider)('http://www.baidu.com/s?wd=site%3A' + domain, "//div[@id='content_left']//p/b/text()");

          case 4:
            data = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](1);

            error = _context.t0;

          case 10:
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              if (error) {
                reject(error);
              } else {
                resolve(data);
              }
            }));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 7]]);
  }));

  return function checkSite(_x) {
    return _ref.apply(this, arguments);
  };
}();

var checkPage = function checkPage(result, domain) {
  if (_lodash2.default.isEmpty(result)) {
    return false;
  }
  var len = result.length;
  for (var i = 0; i < len; i++) {
    if (_lodash2.default.startsWith(result[i], domain)) {
      return true;
    }
  }
  return false;
};
var checkKeyword = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(domain, keyword, page) {
    var number, data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            number = -1;
            _context2.next = 3;
            return (0, _tool.BasicSpider)('http://www.baidu.com/s?wd=' + encodeURIComponent(keyword) + '\&pn=[0-' + (page - 1) + ']0', "//a[@class='c-showurl']/text()");

          case 3:
            data = _context2.sent;

            _lodash2.default.forEach(data, function (url, i) {
              if (_lodash2.default.startsWith(url, domain)) {
                number = i + 1;
              }
            });
            return _context2.abrupt('return', number);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function checkKeyword(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var checkKeywords = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(site) {
    var results, j, keyword, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            results = [];
            j = 0;

          case 2:
            if (!(j < site.keywords.length)) {
              _context3.next = 11;
              break;
            }

            keyword = site.keywords[j];
            _context3.next = 6;
            return checkKeyword(site.domain, keyword, site.result.page || 5);

          case 6:
            result = _context3.sent;

            results.push({ keyword: keyword, rank: result });

          case 8:
            j++;
            _context3.next = 2;
            break;

          case 11:
            return _context3.abrupt('return', results);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function checkKeywords(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
exports.checkSite = checkSite;
exports.checkKeyword = checkKeyword;
exports.checkKeywords = checkKeywords;