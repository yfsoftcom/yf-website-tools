import {baidu, com58, job51} from './src'

// (async () => {
//   let data = {}
//   try{
//     data.site = await baidu.spider.checkSite('www.xinyangjlm.com')
//     data.keywords = await baidu.spider.checkKeywords({domain: 'www.xinyangjlm.com',result:{page:3}, keywords:['新扬卷帘门', '扬州卷帘门']})
//     // data.push = await baidu.pusher.pushUrls(site)
//     console.log(data)
//   }catch(e){
//     console.log(e)
//   }
// })()

// test 58.com
// (async () => {
//   let data = {}
//   try{
//     data.site = await com58.spider.getJobs('ruanjiangong')
//     // data.push = await baidu.pusher.pushUrls(site)
//     console.log(data)
//   }catch(e){
//     console.log(e)
//   }
// })()

// test 51job.com
(async () => {
  let data = {}
  try{
    data.site = await job51.spider.getJobs()
    // data.push = await baidu.pusher.pushUrls(site)
    console.log(data)
  }catch(e){
    console.log(e)
  }
})()
