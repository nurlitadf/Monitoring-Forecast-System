const express = require('express');
const { getDataByModelMonthYear, getData } = require('../models/data');
const { getWeightModel, updateWeightModel } = require('../models/weightModel');
const { getInitialTime, getBMKGData } = require('../models/bmkgData');

const router = express.Router();

router.get('/data', async (req, res, next) => {
    const model = req.query['model'] || 'CFSv2';
    const type = req.query['type'] || 'precip';
    const month = req.query['month'] || 'January';
    const year = req.query['year'] || '2019';
    
    getDataByModelMonthYear(model,type,month,year).then((response) => {
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
    const { data } = req.body;

    updateWeightModel(data).then((response) => {
        res.send(response);
    });
});

router.get('/bmkg-data', async (req, res, next) => {
    const initialTime = req.query['initialTime'];
    initialTime.replace('+', ' ');
    // console.log(initialTime);
    const leadTime = req.query['leadTime'];
    getBMKGData(initialTime, leadTime).then((response) => {
        res.send(response);
    });
});

router.get('/bmkg-data/initial-time', async (req, res, next) => {
    getInitialTime().then((response) => {
        res.send(response);
    })
});

router.get('/', (req, res, next) => {
    res.send('API is working properly');
});

module.exports = router;
