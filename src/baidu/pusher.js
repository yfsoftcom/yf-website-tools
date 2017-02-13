import _ from 'lodash'
import fetch from 'node-fetch'
import {sitemapParse} from './parse'

const pushUrls = async (site) => {
  let urls
  if(site.sitemap){
    let doc = await fetch('http://' + site.domain + '/' + site.sitemap)
    doc = await doc.text()
    urls = sitemapParse(doc)
    urls.push('http://' + site.domain);
    urls = urls.join('\n');
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
