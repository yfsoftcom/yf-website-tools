'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushUrls = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _parse = require('./parse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pushUrls = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(site) {
    var urls, doc, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            urls = void 0;

            if (!site.sitemap) {
              _context.next = 13;
              break;
            }

            _context.next = 4;
            return (0, _nodeFetch2.default)('http://' + site.domain + '/' + site.sitemap);

          case 4:
            doc = _context.sent;
            _context.next = 7;
            return doc.text();

          case 7:
            doc = _context.sent;

            urls = (0, _parse.sitemapParse)(doc);
            urls.push('http://' + site.domain);
            urls = urls.join('\n');
            _context.next = 14;
            break;

          case 13:
            urls = site.urls || 'http://' + site.domain;

          case 14:
            _context.next = 16;
            return (0, _nodeFetch2.default)('http://data.zz.baidu.com/urls?site=' + site.domain + '&token=' + site.token, {
              method: 'POST',
              headers: {
                'Content-Type': 'text/plain'
              },
              body: urls
            });

          case 16:
            data = _context.sent;
            _context.next = 19;
            return data.json();

          case 19:
            data = _context.sent;
            return _context.abrupt('return', data);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function pushUrls(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.pushUrls = pushUrls;