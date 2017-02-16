import _ from 'lodash'
import fetch from 'node-fetch'
import DomXpathSelector from './DomXpathSelector'

const defaultOptions = {
  onlyBody: true,
  htmlNS: {xmlns : 'http://www.w3.org/1999/xhtml'},
  namespace: undefined,
}
const getBodyContent = (body) => {
  return /<body[^>]*>([\s\S]*)<\/body>/.exec(body)[0]
}
class WebXpathSelector{

  constructor(url){
    this._url = url
  }

  getSelector(options){
    let _options = _.assign(defaultOptions, options)
    let self = this
    if(self._domXpathSelector)
      return self._domXpathSelector

    return new Promise((resolve, reject) => {
      fetch(this._url)
        .then((rsp) => {
          return rsp.text()
        })
        .then((body) => {
          if(_options.onlyBody){
            body = getBodyContent(body)
          }
          self._domXpathSelector = new DomXpathSelector(body, _options.namespace)
          resolve(self._domXpathSelector)
        })
        .catch((err)=>{
          reject(err)
        })
    })
  }
}

export default WebXpathSelector
