const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

app.use('/boards', require('./board'));
app.use('/busstop', require('./src/api/busStopApi'));
app.use('/routeStn', require('./src/api/routeStnApi'));

app.use('/busstopArrival', require('./src/api/busStopArrivalApi'));
app.use('/busstopTargetArrival', require('./src/api/busStopTargetArrivalApi'));
app.use('/buslocation', require('./src/api/busLocationApi'));
app.use('/kakaomap', require('./src/kakaoMap/kakaomapApi'));

app.listen(process.env.PORT || port, () => {
  console.log('Listening...');


});
