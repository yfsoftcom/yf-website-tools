import _ from 'lodash'
import xpath from 'xpath'
import dom from 'xmldom'

const parser = dom.DOMParser

const getData = (nodes) => {
  let data = _.map(nodes, (node) => {
    return _.trim(node.nodeValue)
  })
  if(data.length === 1){
    data = data[0]
  }
  return data
}

const parseObject = (doc, obj, select) => {
  let _select = select || xpath.select
  if(_.isObject(obj)){
    _.forEach(obj, (val) => {
      let nodes = _select(val.xpath, doc)
      val.result = getData(nodes)
    })
    return obj
  }else{
    let nodes = _select(obj, doc)
    return getData(nodes)
  }
}

class DomXpathSelector{

  constructor(xmlstr, namespace){
    this._doc = new parser({
      locator:{},
      errorHandler:{
        warning: function(w){},error:function(e){},fatalError:function(e){}}
    }).parseFromString(xmlstr)
    if(namespace){
      this._select = xpath.useNamespaces(namespace)
    }
  }

  select(xpaths){
    if(_.isArray(xpaths)){
      return _.map(xpaths, (obj) => {
        return parseObject(this._doc, obj, this._select)
      })
    }else{
      return parseObject(this._doc, xpaths, this._select)
    }
  }
}

export default DomXpathSelector
