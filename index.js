import {baidu} from './src'

(async () => {
  let data = {}
  try{
    data.site = await baidu.spider.checkSite('www.xinyangjlm.com')
    data.keywords = await baidu.spider.checkKeywords({domain: 'www.xinyangjlm.com',result:{page:3}, keywords:['新扬卷帘门', '扬州卷帘门']})
    // data.push = await baidu.pusher.pushUrls(site)
    console.log(data)
  }catch(e){
    console.log(e)
  }
})()
