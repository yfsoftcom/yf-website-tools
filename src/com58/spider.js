/**
for 58.com
**/
import _ from 'lodash'
import fetch from 'node-fetch'
import { jobParse, jobDetailParse } from './parse'
import each from 'async/each'
import Q from 'bluebird'


const getJobDetail = Q.promisify((list, callback)=>{
  each(list, (item, cb) => {
    fetch('http://yz.58.com/tech/' + item.id + 'x.shtml')
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


const getJobs = async (type) => {
  let error, data
  try{
    let doc = await fetch('http://yz.58.com/' + type)
    doc = await doc.text()
    data = jobParse(doc)
    if(data){
      //get detail
      data = await getJobDetail(data)
      // await getJobDetail(data)
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
