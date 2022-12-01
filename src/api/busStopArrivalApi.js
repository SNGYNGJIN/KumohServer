const express = require('express');
const router = express.Router();
const axios = require('axios');
const https = require("https");

const url = 'https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey='
const key = 'btg61%2BH2BcIymonQ260mu2Q1kkjD0WBSsdTdDScJd8OunwmGJvImYug6yIvJpZr%2BZ1oUsXYCLNZ5AXXzhvo9sQ%3D%3D'
const option = '&pageNo=1&_type=json&numOfRows=10&_type=xml&cityCode=37050&nodeId='

const httpsAgent = new https.Agent({
	rejectUnauthorized: false,
});

const total = url + key + option;
let item;

router.get('/', async function (req, res, next) {
	console.log("BusStopArrival Get Method - Read All");
	const { data } = await axios.get(total, { httpsAgent });
	item = data;
	res.json({ success: true, data: item });
});

router.get('/:nodeId', async (req, res, next) => {
	console.log("BusStopArrival Get Method - Read " + req.params.nodeId);
	const { data } = await axios.get(total + req.params.nodeId, { httpsAgent });
	item = data;
	res.json({ success: true, data: item });
});

module.exports = router;
