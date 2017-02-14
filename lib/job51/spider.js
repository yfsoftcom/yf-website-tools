'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJobs = undefined;

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

var _each = require('async/each');

var _each2 = _interopRequireDefault(_each);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getJobDetail = _bluebird2.default.promisify(function (list, callback) {
  (0, _each2.default)(list, function (item, cb) {
    (0, _nodeFetch2.default)('http://jobs.51job.com/yangzhou/' + item.id + '.html').then(function (rsp) {
      return rsp.text();
    }).then(function (body) {
      item = _lodash2.default.assign(item, (0, _parse.jobDetailParse)(body));
      cb(null);
    });
  }, function (err) {
    callback(null, list);
  });
});

var getJobs = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var error, data, doc;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            error = void 0, data = void 0;
            _context.prev = 1;
            _context.next = 4;
            return (0, _nodeFetch2.default)('http://search.51job.com/jobsearch/search_result.php?&jobarea=070800&funtype=0100&industrytype=01&curr_page=1');

          case 4:
            doc = _context.sent;
            _context.next = 7;
            return doc.text();

          case 7:
            doc = _context.sent;

            data = (0, _parse.jobParse)(doc);

            if (!data) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return getJobDetail(data);

          case 12:
            data = _context.sent;

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](1);

            error = _context.t0;

          case 18:
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              if (error) {
                reject(error);
              } else {
                resolve(data);
              }
            }));

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 15]]);
  }));

  return function getJobs() {
    return _ref.apply(this, arguments);
  };
}();

exports.getJobs = getJobs;