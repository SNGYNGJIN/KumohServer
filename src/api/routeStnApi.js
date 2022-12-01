const express = require('express');
const router = express.Router();
const routeStn = require('./RouteStn.json')

router.get('/', async function (req, res, next) {
    console.log("RouteStn Get Method - Read All");
    res.json({ success: true, data: routeStn });
});

router.post('/', async function (req, res, next) {
    console.log("RouteStn Post Method - Read All");
    console.log(req.body.keyword);

    res.json({
        success: true, data: routeStn.filter(function (e) {
            return e.routeid.match(req.body.keyword);
        })
    });
});

module.exports = router;
