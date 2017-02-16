'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _xpath = require('xpath');

var _xpath2 = _interopRequireDefault(_xpath);

var _xmldom = require('xmldom');

var _xmldom2 = _interopRequireDefault(_xmldom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parser = _xmldom2.default.DOMParser;

var getData = function getData(nodes) {
  var data = _lodash2.default.map(nodes, function (node) {
    return _lodash2.default.trim(node.nodeValue);
  });
  if (data.length === 1) {
    data = data[0];
  }
  return data;
};

var parseObject = function parseObject(doc, obj, select) {
  var _select = select || _xpath2.default.select;
  if (_lodash2.default.isObject(obj)) {
    _lodash2.default.forEach(obj, function (val) {
      var nodes = _select(val.xpath, doc);
      val.result = getData(nodes);
    });
    return obj;
  } else {
    var nodes = _select(obj, doc);
    return getData(nodes);
  }
};

var DomXpathSelector = function () {
  function DomXpathSelector(xmlstr, namespace) {
    (0, _classCallCheck3.default)(this, DomXpathSelector);

    this._doc = new parser({
      locator: {},
      errorHandler: {
        warning: function warning(w) {}, error: function error(e) {}, fatalError: function fatalError(e) {} }
    }).parseFromString(xmlstr);
    if (namespace) {
      this._select = _xpath2.default.useNamespaces(namespace);
    }
  }

  (0, _createClass3.default)(DomXpathSelector, [{
    key: 'select',
    value: function select(xpaths) {
      var _this = this;

      if (_lodash2.default.isArray(xpaths)) {
        return _lodash2.default.map(xpaths, function (obj) {
          return parseObject(_this._doc, obj, _this._select);
        });
      } else {
        return parseObject(this._doc, xpaths, this._select);
      }
    }
  }]);
  return DomXpathSelector;
}();

exports.default = DomXpathSelector;