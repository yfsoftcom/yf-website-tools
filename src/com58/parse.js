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
  let $content = $body.find('.posinfo')
  let data = {}
  data.sala = $content.find('.salaNum>strong').text()

  _.map($content.find('.condition .fl'), (item) => {
    let $item = $(item)
    if(_.startsWith($item.find('span').text(), '学历')){
      data.edu = $item.text()
    }else if(_.startsWith($item.find('span').text(), '工作')){
      data.exp = $item.text()
    }
  })
  data.desc = _.replace($body.find('.posMsg').text(), /\t/g, ' ')
  return data
}

const jobParse = (body) =>{
  body = getBodyContent(body)
  let $content = $(body).find('#infolist')

  if($content.length < 1){
    return false;
  }else{
    const jobs = $content.find('dl')
    return _.map(jobs, (item)=>{
      item = $(item)
      return {
        id: _.trim(item.find('dd>i').attr('infoid')),
        title: _.trim(item.find('dt>a').text()),
        company: _.trim(item.find('dd>a').text()),
        area: _.trim(item.find('dd.w96').text()),
        updateAt: _.trim(item.find('dd.w68').text()),
      }
    })
  }
}

export { jobParse, jobDetailParse }
