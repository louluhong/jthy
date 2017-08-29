import axios from 'axios';
/*import * as config from './api-config.js'*/
let BaseUrl="http://182.254.138.91:8098/api/WeiXin";
export function getUtil(type,param){
	/*console.info(BaseUrl)
	axios.get('/user', {
    params: param
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });*/
	return new Promise((resolve, reject)=> {
    axios.get(BaseUrl + [type])
        .then(function (response) {
    resolve(response.data);
  })
  .catch(function (error) {
    resolve(error.message)
  })
  	})
}

export function postUtil(type,param){

}

export function uploadUtil(type,param){

}