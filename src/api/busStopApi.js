const express = require('express');
const router = express.Router();
const busstop = require('./BusStop.json')

router.get('/', async function (req, res, next) {
    console.log("BusStop Get Method - Read All");
    res.json({ success: true, data: busstop });
});

router.post('/', async function (req, res, next) {
    console.log("BusStop Post Method - Read All");
    console.log(req.body.keyword);

    res.json({
        success: true, data: busstop.filter(function (e) {
            return e.nodenm.match(req.body.keyword);
        })
    });
});

module.exports = router;
