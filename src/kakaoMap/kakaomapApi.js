const express  = require('express');
const path = require('path');

const router = express.Router();

router.get('/', function(req, res, next) {
	console.log("REST API Get Method - Read All");
	// const js = '//dapi.kakao.com/v2/maps/sdk.js?appkey=4e183603a64e7954cf3054bf5bd15786';
	// res.send(js);
	res.sendFile(path.join(__dirname, './test.html'));
});
module.exports = router;
