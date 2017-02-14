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
  var data = {};
  data.desc = _lodash2.default.replace($body.find('.job_msg ').text(), /\t/g, ' ');
  data.desc = _lodash2.default.replace(data.desc, /\n/g, ',');
  return data;
};

var jobParse = function jobParse(body) {
  body = getBodyContent(body);
  var $content = $(body).find('#resultList');

  if ($content.length < 1) {
    return false;
  } else {
    var jobs = $content.find('.el');
    _lodash2.default.slice(jobs, 0, 1);
    return _lodash2.default.map(jobs, function (item) {
      item = $(item);
      return {
        id: _lodash2.default.trim(item.find('.t1>input').val()),
        title: _lodash2.default.trim(item.find('.t1 a').attr('title')),
        company: _lodash2.default.trim(item.find('.t2 a').attr('title')),
        area: _lodash2.default.trim(item.find('.t3').text()),
        sala: _lodash2.default.trim(item.find('.t4').text()),
        updateAt: _lodash2.default.trim(item.find('.t5').text())
      };
    });
  }
};

exports.jobParse = jobParse;
exports.jobDetailParse = jobDetailParse;