const express = require('express');
const { getDataByModelMonthYear, getData } = require('../models/data');
const { getWeightModel, updateWeightModel } = require('../models/weightModel');

const router = express.Router();

router.get('/data', async (req, res, next) => {
    const model = req.query['model'] || 'CFSv2';
    const month = req.query['month'] || 'January';
    const year = req.query['year'] || '2019';
    
    getDataByModelMonthYear(model,month,year).then((response) => {
        res.send(response);
    });
});

router.get('/data/all', async (req, res, next) => {
    getData().then((response) => {
        res.send(response);
    });
});

router.get('/weight-model', async (req, res, next) => {
    getWeightModel().then((response) => {
        res.send(response);
    });
});

router.put('/weight-model', async (req, res, next) => {
    const { model, weight } = req.body;

    updateWeightModel(model, weight).then((response) => {
        res.send(response);
    });
});

router.get('/', (req, res, next) => {
    res.send('API is working properly');
});

module.exports = router;
