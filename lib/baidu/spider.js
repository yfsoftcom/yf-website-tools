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

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _parse = require('./parse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkSite = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(domain) {
    var error, data, doc;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            error = void 0, data = void 0;
            _context.prev = 1;
            _context.next = 4;
            return (0, _nodeFetch2.default)('http://www.baidu.com/s?wd=site%3A' + domain);

          case 4:
            doc = _context.sent;
            _context.next = 7;
            return doc.text();

          case 7:
            doc = _context.sent;

            data = (0, _parse.siteParse)(doc);
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](1);

            error = _context.t0;

          case 14:
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              if (error) {
                reject(error);
              } else {
                resolve(data);
              }
            }));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 11]]);
  }));

  return function checkSite(_x) {
    return _ref.apply(this, arguments);
  };
}();

var checkKeyword = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(domain, keyword, page) {
    var flag, i, doc;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            flag = false;
            i = 0;

          case 2:
            if (!(i < page)) {
              _context2.next = 21;
              break;
            }

            _context2.prev = 3;
            _context2.next = 6;
            return (0, _nodeFetch2.default)('http://www.baidu.com/s?wd=' + encodeURIComponent(keyword) + '\&pn=' + i * 10);

          case 6:
            doc = _context2.sent;
            _context2.next = 9;
            return doc.text();

          case 9:
            doc = _context2.sent;

            if (!(0, _parse.keywordParse)(doc, domain)) {
              _context2.next = 13;
              break;
            }

            flag = { page: i + 1 };
            return _context2.abrupt('break', 21);

          case 13:
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2['catch'](3);

            console.log(_context2.t0);

          case 18:
            i++;
            _context2.next = 2;
            break;

          case 21:
            return _context2.abrupt('return', flag);

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 15]]);
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