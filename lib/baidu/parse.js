'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sitemapParse = exports.keywordParse = exports.siteParse = undefined;

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var window = _jsdom2.default.jsdom().defaultView;

var $ = (0, _jquery2.default)(window);
var getBodyContent = function getBodyContent(body) {
  return (/<body[^>]*>([\s\S]*)<\/body>/.exec(body)[0]
  );
};

var siteParse = function siteParse(body) {
  body = getBodyContent(body);
  var $content = $(body).find('#content_left');

  if ($content.length < 1) {
    return false;
  } else {
    return $content.find('.site_tip p b').text();
  }
};

var sitemapParse = function sitemapParse(body) {
  return _lodash2.default.map($(body).find('loc'), function (item) {
    return item.innerHTML;
  });
};

var keywordParse = function keywordParse(body, domain) {
  body = getBodyContent(body);
  var $content = $(body).find('#content_left');
  if ($content.length < 1) {
    return false;
  } else {
    var urls = $content.find('.result>.f13>a.c-showurl'),
        len = urls.length;
    for (var i = 0; i < len; i++) {
      if (_lodash2.default.startsWith(urls[i].innerHTML, domain)) {
        return true;
      }
    }
    return false;
  }
};

exports.siteParse = siteParse;
exports.keywordParse = keywordParse;
exports.sitemapParse = sitemapParse;