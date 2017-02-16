import _ from 'lodash'
import each from 'async/each'
import DomXpathSelector from './DomXpathSelector'
import WebXpathSelector from './WebXpathSelector'

const ObjectConvert = (data)=>{
  let list = []
  _.forEach( data, (val, key)=>{
    _.forEach(val.result, (v, i) => {
      let o = {}
      o[key] = v
      list[i] = _.assign(list[i], o)
    })
  })
  return list
}

const singlePageSpider = (item, callback)=>{
  new WebXpathSelector(item.url)
    .getSelector(item.options)
    .then((selector)=>{
      let data = selector.select(item.xpaths)
      if(_.assign({convert: false}, item.options).convert){
        data = ObjectConvert(data)
      }
      item.data = data
      callback()
    })
    .catch((err)=>{
      callback(err)
    })
}

const regPages = /\[(\d*)-(\d*)\]/g

const BasicSpider = async (url, xpaths, options) => {
  //Multiple pages

  if(regPages.test(url)){
    let placeholder = url.match(regPages)[0]
    let pages = '0 1 2 3 4 5 6 7 8 9'.match(new RegExp(placeholder, 'g'))
    let items = _.map(pages, (p) => {
      return { url: _.replace(url, placeholder, p),
               xpaths: xpaths,
               options: options,
             }
    })
    return new Promise( (resolve, reject) => {
      each(items, singlePageSpider,
        (err)=>{
          if(err){
            reject(err)
          }else{
            let datas = []
            _.forEach(_.map(items, i => i.data), arr => {
              datas = _.concat(datas, arr)
            })
            resolve(datas)
          }
        }
      )
    })
  }else{
    return new Promise( (resolve, reject) => {
      let item = {url: url, xpaths: xpaths, options: options}
      singlePageSpider(item,
        (err)=> {
        if(err){
          reject(err)
        }else{
          resolve(item.data)
        }
      })
    })
  }
}

export { WebXpathSelector, DomXpathSelector, BasicSpider }
