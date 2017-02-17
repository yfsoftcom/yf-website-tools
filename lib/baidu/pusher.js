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

var _tool = require('../tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pushUrls = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(site) {
    var urls, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            urls = void 0;

            if (!site.sitemap) {
              _context.next = 11;
              break;
            }

            _context.next = 4;
            return (0, _tool.BasicSpider)('http://' + site.domain + '/' + site.sitemap, "//urls:loc/text()", {
              onlyBody: false,
              namespace: { urls: 'http://www.sitemaps.org/schemas/sitemap/0.9' }
            });

          case 4:
            urls = _context.sent;

            if (_lodash2.default.isString(urls)) {
              urls = [urls];
            }
            console.log(urls);
            urls.push('http://' + site.domain);
            urls = urls.join('\n');
            _context.next = 12;
            break;

          case 11:
            urls = site.urls || 'http://' + site.domain;

          case 12:
            _context.next = 14;
            return (0, _nodeFetch2.default)('http://data.zz.baidu.com/urls?site=' + site.domain + '&token=' + site.token, {
              method: 'POST',
              headers: {
                'Content-Type': 'text/plain'
              },
              body: urls
            });

          case 14:
            data = _context.sent;
            _context.next = 17;
            return data.json();

          case 17:
            data = _context.sent;
            return _context.abrupt('return', data);

          case 19:
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