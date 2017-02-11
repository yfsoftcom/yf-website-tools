import jsdom from 'jsdom'
import jquery from 'jquery'
import _ from 'lodash'

let window = jsdom.jsdom().defaultView

let $ = jquery(window)
const getBodyContent = (body) => {
  return /<body[^>]*>([\s\S]*)<\/body>/.exec(body)[0]
}

const siteParse = (body) =>{
  body = getBodyContent(body)
  let $content = $(body).find('#content_left')

  if($content.length < 1){
    return false;
  }else{
    return $content.find('.site_tip p b').text()
  }
}

const sitemapParse = (body) => {
  return _.map($(body).find('loc'), (item) =>{
    return item.innerHTML
  })
}

const keywordParse = (body, domain) =>{
  body = getBodyContent(body)
  let $content = $(body).find('#content_left')
  if($content.length < 1){
    return false;
  }else{
    let urls = $content.find('.result>.f13>a.c-showurl'),
        len = urls.length
    for(let i = 0; i<len; i++){
      if(_.startsWith(urls[i].innerHTML, domain)){
        return true
      }
    }
    return false
  }
}

export { siteParse, keywordParse, sitemapParse }
