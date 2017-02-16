# yf-website-tool

Feature:

- spider

获取 http://yz.58.com/ruanjiangong/pn1, http://yz.58.com/ruanjiangong/pn1, http://yz.58.com/ruanjiangong/pn1 页面中的元素

```javascript
(async () => {
  let data = await BasicSpider(
    'http://yz.58.com/ruanjiangong/pn[1-3]',
    {
      id: { xpath: "//div[@id='infolist']//dd/i/@infoid"},
      title: { xpath: "//div[@id='infolist']//dt/a/text()"},
      company: { xpath: "//div[@id='infolist']//dd/a/text()"},
      area: { xpath: "//div[@id='infolist']//dd[@class='w96']/text()"},
      publishAt: { xpath: "//div[@id='infolist']//dd[@class='w68']/text()"},
    },
    {
      convert: true
    }
  )
  console.log(data)
})() //*/

```


提供一些工具,方便进行网站的收录,查看网站排名等等

ex:

```javascript
import {baidu} from './src'

(async () => {
  try{
    let data = await baidu.crawler.checkSite('www.xinyangjlm.com')
    console.log(data)
    // data = await checkKeyword( 'www.xinyangjlm.com','新扬卷帘门',10)
    // console.log(data)
    // data = await checkKeywords({domain: 'www.xinyangjlm.com',result:{page:3}, keywords:['新扬卷帘门', '扬州卷帘门']})
    // console.log(data)
    data = await baidu.pusher.pushUrls({domain:'www.xinyangjlm.com', token: '0AYcFf1d70qGvufH', sitemap: 'baidusitemap.xml'})
    console.log(data)
  }catch(e){
    console.log(e)
  }
})()

```
