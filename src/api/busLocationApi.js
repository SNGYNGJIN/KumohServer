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
const job = schedule.scheduleJob('0 * * * * *', async function () {
	getTargetCount(route);
});

async function getTargetCount(route) {
	Object.keys(route).forEach(async (i) => {
		const res = await APICall(route[i]['routeid']);
		loadedData[route[i]['routeid']] = res.data;
		// console.log(loadedData[route[i]['routeid']]);
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
