const express  = require('express');
const router = express.Router();
const axios = require('axios');
const https = require("https");

const url = 'http://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoSpcifyRouteBusArvlPrearngeInfoList?serviceKey='
const key = 'btg61%2BH2BcIymonQ260mu2Q1kkjD0WBSsdTdDScJd8OunwmGJvImYug6yIvJpZr%2BZ1oUsXYCLNZ5AXXzhvo9sQ%3D%3D'
const option = '&pageNo=1&_type=json&numOfRows=10&_type=xml&cityCode=37050&nodeId='
const option2 = '&routeId='

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

router.get('/', async function(req, res, next) {
	console.log("BusStopTarget Get Method - Read All");
	const total = url + key + option;
	const { data } = await axios.get(total, { httpsAgent });
	let item = data;
	res.json({success:true, data:item});
});

router.get('/:nodeId/:routeId', async(req, res, next)=> {
console.log("BusStopTarget Get Method - Read " + req.params.nodeId + " " + req.params.routeId);
	const total = url + key + option;
	const { data } = await axios.get(total + req.params.nodeId + option2 + req.params.routeId , { httpsAgent });
	let item = data;
	res.json({success:true, data:item});
});

module.exports = router;
