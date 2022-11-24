const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

app.use('/boards', require('./board'));
app.use('/busstop', require('./busStopApi'));
app.use('/buslocation', require('./busLocationApi'));

app.listen(process.env.PORT || port, () => {
	console.log('Listening...');
});
