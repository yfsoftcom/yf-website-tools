/**
for baidu.com
**/
import _ from 'lodash'
import { BasicSpider } from '../tool'

const checkSite = async (domain) => {
  let error, data
  try{
    data = await BasicSpider('http://www.baidu.com/s?wd=site%3A' + domain,
                              "//div[@id='content_left']//p/b/text()")
  }catch(e){
    error = e
  }
  return new Promise( (resolve, reject) => {
    if(error){
      reject(error)
    }else{
      resolve(data)
    }
  })
}

const checkPage = (result, domain) => {
  if(_.isEmpty(result)){
    return false
  }
  let len = result.length
  for(let i = 0; i<len; i++){
    if(_.startsWith(result[i], domain)){
      return true
    }
  }
  return false
}
const checkKeyword = async (domain, keyword, page) => {
  let number = -1
  let data = await BasicSpider(
    'http://www.baidu.com/s?wd=' + encodeURIComponent(keyword) + '\&pn=[0-' + (page -1) +']0',
    "//a[@class='c-showurl']/text()",
  )
  _.forEach(data, (url, i)=>{
    if(_.startsWith(url, domain)){
      number = (i + 1)
    }
  })
  return number
}

const checkKeywords = async (site) => {
  let results = []
  for(let j = 0; j< site.keywords.length ; j++){
    let keyword = site.keywords[j]
    let result = await checkKeyword(site.domain, keyword, site.result.page || 5)
    results.push({ keyword: keyword, rank: result})
  }
  return results
}
export { checkSite,checkKeyword, checkKeywords}
