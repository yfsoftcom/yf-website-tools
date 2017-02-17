import _ from 'lodash'
import fetch from 'node-fetch'
import { BasicSpider } from '../tool'

const pushUrls = async (site) => {
  let urls
  if(site.sitemap){
    urls = await BasicSpider(
      'http://' + site.domain + '/' + site.sitemap,
      "//urls:loc/text()",
      {
        onlyBody: false,
        namespace: {urls: 'http://www.sitemaps.org/schemas/sitemap/0.9'},
      })
    if(_.isString(urls)){
      urls = [urls]
    }
    console.log(urls)
    urls.push('http://' + site.domain)
    urls = urls.join('\n')
  }else{
    urls = site.urls || 'http://' + site.domain
  }
  let data = await fetch('http://data.zz.baidu.com/urls?site=' + site.domain + '&token=' + site.token,
    {
      method: 'POST',
      headers: {
       'Content-Type': 'text/plain'
      },
      body: urls
    }
  )
  data = await data.json()
  return data
}

export { pushUrls }
