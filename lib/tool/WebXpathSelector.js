'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _DomXpathSelector = require('./DomXpathSelector');

var _DomXpathSelector2 = _interopRequireDefault(_DomXpathSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  onlyBody: true,
  htmlNS: { xmlns: 'http://www.w3.org/1999/xhtml' },
  namespace: undefined
};
var getBodyContent = function getBodyContent(body) {
  return (/<body[^>]*>([\s\S]*)<\/body>/.exec(body)[0]
  );
};

var WebXpathSelector = function () {
  function WebXpathSelector(url) {
    (0, _classCallCheck3.default)(this, WebXpathSelector);

    this._url = url;
  }

  (0, _createClass3.default)(WebXpathSelector, [{
    key: 'getSelector',
    value: function getSelector(options) {
      var _this = this;

      var _options = _lodash2.default.assign(defaultOptions, options);
      var self = this;
      if (self._domXpathSelector) return self._domXpathSelector;

      return new _promise2.default(function (resolve, reject) {
        (0, _nodeFetch2.default)(_this._url).then(function (rsp) {
          return rsp.text();
        }).then(function (body) {
          if (_options.onlyBody) {
            body = getBodyContent(body);
          }
          self._domXpathSelector = new _DomXpathSelector2.default(body, _options.namespace);
          resolve(self._domXpathSelector);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }]);
  return WebXpathSelector;
}();

exports.default = WebXpathSelector;