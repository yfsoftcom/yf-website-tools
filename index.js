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
