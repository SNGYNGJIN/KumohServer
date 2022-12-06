const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require("https");
const route = require('./Route.json')
const schedule = require('node-schedule');

const url = 'http://apis.data.go.kr/1613000/BusLcInfoInqireService/getRouteAcctoBusLcList?ServiceKey='
const key = 'btg61%2BH2BcIymonQ260mu2Q1kkjD0WBSsdTdDScJd8OunwmGJvImYug6yIvJpZr%2BZ1oUsXYCLNZ5AXXzhvo9sQ%3D%3D'
const option = '&pageNo=1&_type=json&numOfRows=10&_type=xml&cityCode=37050&routeId='

const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
});	

var loadedData = {};
getTargetCount(route);

// 30초마다 불러오기
// const job = schedule.scheduleJob('*/2 * * * *', async function () {
const job = schedule.scheduleJob('*/30 * * * * *', async function () {
// console.log = (() => {
// 	var console_log = console.log;
// 	var timeStart = new Date().getTime();
	
// 	return function() {
// 	  var delta = new Date().getTime() - timeStart;
// 	  var args = [];
// 	  args.push((delta / 1000).toFixed(2) + ':');
// 	  for(var i = 0; i < arguments.length; i++) {
// 		args.push(arguments[i]);
// 	  }
// 	  console_log.apply(console, args);
// 	};
//   })();
  
//   axios.interceptors.request.use( req => {
// 	req.meta = req.meta || {}
// 	req.meta.requestStartedAt = new Date().getTime();
// 	return req;
//   });
  
//   axios.interceptors.response.use(res => {
// 	console.log(`Execution time for: ${res.config.url}\n - ${ new Date().getTime() - res.config.meta.requestStartedAt} ms`)
// 	return res;
//   },
//   res => {
// 	console.error(`Execution time for: ${res.config.url}\n - ${new Date().getTime() - res.config.meta.requestStartedAt} ms`)
// 	throw res;
//   });
	getTargetCount(route);
});
// async function getTargetCount(route) {
// 	const total = url + key + option;
// 	// Object.keys(route).forEach(async (i) => {
// 		for(let i = 0; i < Object.keys(route).length; i++){
// 		const res = axios.get(total + route, { httpsAgent });
// 		loadedData[route[i]['routeid']] = res.data;
// 		}
// 		// console.log(loadedData[route[i]['routeid']]);
// 	// });
// }


async function getTargetCount(route) {
	Object.keys(route).forEach(async (i) => {
		const res = await APICall(route[i]['routeid']);
		loadedData[route[i]['routeid']] = res.data;
	});
	console.log('Bus Location Information Loaded');
}

function APICall(param) {
	const total = url + key + option;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(axios.get(total + param, { httpsAgent }))
		}, param);
	})
}

router.get('/', async function (req, res, next) {
	res.json({success: true, data: loadedData})
});

router.get('/:routeId', async (req, res, next) => {
	console.log("BusLocation API Get Method - Read " + req.params.routeId);
	const total = url + key + option;
	const { data } = await axios.get(total + req.params.routeId, { httpsAgent });
	let item = data;
	res.json({ success: true, data: item });
});

module.exports = router;
