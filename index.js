import _ from 'lodash'
import {baidu, BasicSpider, DomXpathSelector} from './src'

// console.log('1 2 3 4 5 6 7 8 9'.match(new RegExp('[1-8]', 'g')))

// console.log('hfdjas.p[11-91].html'.match(/\[(\d*)-(\d*)\]/g))
/*
(async () => {
  let data = await BasicSpider(
    'http://yz.58.com/ruanjiangong/pn1',
    {
      id: { xpath: "//div[@id='infolist']//dd/i/@infoid" },
      title: { xpath: "//div[@id='infolist']//dt/a/text()"},
      company: { xpath: "//div[@id='infolist']//dd/a/text()"},
      area: { xpath: "//div[@id='infolist']//dd[@class='w96']/text()"},
      publishAt: { xpath: "//div[@id='infolist']//dd[@class='w68']/text()"},
    },
    {
      convert: true,
      onlyBody: true,
      reject: false,
      children: {
        url: 'http://yz.58.com/tech/[?]x.shtml',
        id: 'id',
        options: {convert: true},
        xpaths: {
          sala: { xpath: "//div[@class='posCont']//li[@class='condition'][1]//strong/text()" },
          edu: { xpath: "//div[@class='posCont']//li[@class='condition'][1]//div[@class='fl']/text()" },
        }
      }
    }
  )

  console.log(data)
})() //*/

/*
(async () => {
  let data = await BasicSpider(
    'http://www.baidu.com/s?wd=' + encodeURIComponent('扬州卷帘门') + '\&pn=[0-4]0',
    "//a[@class='c-showurl']/text()",
  )
  _.forEach(data, (url, i)=>{
    if(_.startsWith(url, 'www.xinyangjlm.com')){
      console.log(i)
    }
  })
})() //*/

///*
(async () => {
  let site = {
    token: '0AYcFf1d70qGvufH',
    result: {to: '1794947912@qq.com', subject: '百度收录', page: 1},
    domain: 'blog.yunplus.io',
    keywords: [],
    sitemap: 'baidusitemap.xml',
    update: false,
    urls: false
  }
  let data = {}
  try{
    data.site = await baidu.spider.checkSite(site.domain)
    data.keywords = await baidu.spider.checkKeywords(site)
    data.push = await baidu.pusher.pushUrls(site)
    console.log(JSON.stringify(data, null, 2))
  }catch(e){
    console.log(e)
  }
})() //*/


/*
//test 58.com
(async () => {
  let data = {}
  try{
    data.site = await com58.spider.getJobs('ruanjiangong')
    console.log(data)
  }catch(e){
    console.log(e)
  }
})()
//*/
// test 51job.com
// (async () => {
//   let data = {}
//   try{
//     data.site = await job51.spider.getJobs()
//     // data.push = await baidu.pusher.pushUrls(site)
//     console.log(data)
//   }catch(e){
//     console.log(e)
//   }
// })()
/*
let domXpathSelector = new DomXpathSelector(`
  <urlset>
    <url>
      <loc>http://www.xinyangjlm.com/1001.html</loc>
      <lastmod>2017-02-15T08:00:06.894Z</lastmod>
      <data>
        <display>
          <title>关于卷帘门的使用帮助</title>
          <pubTime>2017-02-13T09:58:58.000Z</pubTime>
          <breadCrumb title="help" url="http://www.xinyangjlm.com/categories/help/"/>
        </display>
      </data>
    </url>
    <url>
      <loc>http://www.xinyangjlm.com/7.html</loc>
      <lastmod>2017-02-15T07:59:57.974Z</lastmod>
      <data>
        <display>
          <title>快速门</title>
          <pubTime>2016-11-19T16:00:00.000Z</pubTime>
          <breadCrumb title="product" url="http://www.xinyangjlm.com/categories/product/"/>
        </display>
      </data>
    </url>
  </urlset>`)
let data = domXpathSelector.select('//url///text()')
console.log(data)
//*/
