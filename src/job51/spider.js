/**
for 51job.com
**/
import _ from 'lodash'
import fetch from 'node-fetch'
import { jobParse, jobDetailParse } from './parse'
import each from 'async/each'
import Q from 'bluebird'


const getJobDetail = Q.promisify((list, callback)=>{
  each(list, (item, cb) => {
    fetch('http://jobs.51job.com/yangzhou/' + item.id + '.html')
      .then((rsp) => {
        return rsp.text()
      })
      .then((body) =>{
        item = _.assign(item, jobDetailParse(body))
        cb(null)
      })
  },(err)=>{
    callback(null, list)
  })
})


const getJobs = async () => {
  let error, data
  try{
    let doc = await fetch('http://search.51job.com/jobsearch/search_result.php?&jobarea=070800&funtype=0100&industrytype=01&curr_page=1')
    doc = await doc.text()
    data = jobParse(doc)
    if(data){
      //get detail
      data = await getJobDetail(data)
    }
  }catch(e){
    error = e
  }
  return new Promise( (resolve, reject) => {
    if(error){
      reject(error)
    }else{
      resolve(data)
    }
  })
}

export { getJobs }
