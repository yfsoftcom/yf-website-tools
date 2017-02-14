import jsdom from 'jsdom'
import jquery from 'jquery'
import _ from 'lodash'

let window = jsdom.jsdom().defaultView

let $ = jquery(window)
const getBodyContent = (body) => {
  return /<body[^>]*>([\s\S]*)<\/body>/.exec(body)[0]
}
const jobDetailParse = (body) =>{
  body = getBodyContent(body)
  let $body = $(body)
  let data = {}
  data.desc = _.replace($body.find('.job_msg ').text(), /\t/g, '')
  data.desc = _.replace(data.desc, /\n/g, ',')
  return data
}

const jobParse = (body) =>{
  body = getBodyContent(body)
  let $content = $(body).find('#resultList')

  if($content.length < 1){
    return false;
  }else{
    let jobs = $content.find('.el')
    _.slice(jobs, 0, 1)
    return _.map(jobs, (item)=>{
      item = $(item)
      return {
        id: _.trim(item.find('.t1>input').val()),
        title: _.trim(item.find('.t1 a').attr('title')),
        company: _.trim(item.find('.t2 a').attr('title')),
        area: _.trim(item.find('.t3').text()),
        sala: _.trim(item.find('.t4').text()),
        updateAt: _.trim(item.find('.t5').text()),
      }
    })
  }
}

export { jobParse, jobDetailParse }
