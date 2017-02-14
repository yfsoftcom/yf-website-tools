'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobDetailParse = exports.jobParse = undefined;

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
var jobDetailParse = function jobDetailParse(body) {
  body = getBodyContent(body);
  var $body = $(body);
  var $content = $body.find('.posinfo');
  var data = {};
  data.sala = $content.find('.salaNum>strong').text();

  _lodash2.default.map($content.find('.condition .fl'), function (item) {
    var $item = $(item);
    if (_lodash2.default.startsWith($item.find('span').text(), '学历')) {
      data.edu = $item.text();
    } else if (_lodash2.default.startsWith($item.find('span').text(), '工作')) {
      data.exp = $item.text();
    }
  });
  data.desc = _lodash2.default.replace($body.find('.posMsg').text(), /\t/g, ' ');
  return data;
};

var jobParse = function jobParse(body) {
  body = getBodyContent(body);
  var $content = $(body).find('#infolist');

  if ($content.length < 1) {
    return false;
  } else {
    var jobs = $content.find('dl');
    return _lodash2.default.map(jobs, function (item) {
      item = $(item);
      return {
        id: _lodash2.default.trim(item.find('dd>i').attr('infoid')),
        title: _lodash2.default.trim(item.find('dt>a').text()),
        company: _lodash2.default.trim(item.find('dd>a').text()),
        area: _lodash2.default.trim(item.find('dd.w96').text()),
        updateAt: _lodash2.default.trim(item.find('dd.w68').text())
      };
    });
  }
};

exports.jobParse = jobParse;
exports.jobDetailParse = jobDetailParse;