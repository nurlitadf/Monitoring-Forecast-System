const express = require('express');
const data = require('../models/data');

const router = express.Router();

router.get('/data', async (req, res, next) => {
    const model = req.query['model'] || 'CFSv2';
    const month = req.query['month'] || 'January';
    const year = req.query['year'] || '2019';
    
    data(model,month,year).then((response) => {
        res.send(response);
    });
});

router.get('/', (req, res, next) => {
    res.send('API is working properly');
});

module.exports = router;
