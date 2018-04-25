const express = require('express');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');
const cors = require('cors')

var nexmo = new Nexmo({
    apiKey: '98d3cc35',
    apiSecret: 'PZwk8InxF72JsYk4'
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('nexmo verify');
});

app.post('/request', (req, res) => {
    let toNumber = req.body.number;
    nexmo.verify.request({
        number: toNumber,
        brand:'SMS Guinea'
    },(err, responseData) => {
        res.send({request_id: responseData.request_id});
    });
});

app.post('/verify', (req, res) => {
    let request_id = req.body.request_id;
    let code = req.body.code;
    nexmo.verify.check({
        request_id,
        code
    }, (err, responseData) => {
        res.send({ verified: responseData.status === '0' });
    });
});
    
const server = app.listen(4000, () => console.log('listening on 4000'));