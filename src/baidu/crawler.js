/**
for baidu.com
**/
import _ from 'lodash'
import fetch from 'node-fetch'
import { siteParse, keywordParse } from './parse'

const checkSite = async (domain) => {
  let error, data
  try{
    let doc = await fetch('http://www.baidu.com/s?wd=site%3A' + domain)
    doc = await doc.text()
    data = siteParse(doc)
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

const checkKeyword = async (domain, keyword, page) => {
  let flag = false
  for(let i = 0; i< page ; i++){
    try{
      let doc = await fetch('http://www.baidu.com/s?wd=' + encodeURIComponent(keyword) + '\&pn=' + ((i)*10))
      doc = await doc.text()
      if(keywordParse(doc, domain)){
        flag = { page: i + 1 }
        break
      }
    }catch(e){
      console.log(e)
      // break
    }
  }
  return flag
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
