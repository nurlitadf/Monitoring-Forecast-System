const { getWeightModel } = require('./weightModel');
 
let response = null;
let qb = null;
let responses = null;

const models = ["CFSv2", "CMC1", "CMC2", "GFDL", "GFDL-FLOR", "NASA", "NCAR-CCSM4"];

const QueryBuilder = require('node-querybuilder');

const settings = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

const pool = new QueryBuilder(settings, 'mysql', 'pool');

getNMMEWeighted = async (responses, weight) => {
    // console.log(weight);
    let ret = [];
    responses[0].forEach((value) => {
        let sum = 0;
        let idx = 0;
        let lat = value.lat;
        let lon = value.lon;
        responses.forEach((val) => {
            let tmp = val.find((v) => v.lat === lat && v.lon === lon);
            if(tmp) {
                sum = sum + tmp.value * weight[idx];
            }
            idx++;
        });
        ret.push({
            lat,
            lon,
            value: sum
        });
    });

    return ret;
}

exports.getDataByModelMonthYear = async (model, type, month, year) => {
    try {
        qb = await pool.get_connection();
        if(model === "NMME-Weighted") {
            responses = await Promise.all(models.map(async (value) => {
                return await qb.select('lat, lon, value')
                    .where({'model': value, 'type': type, 'year': year, 'month': month})
                    .get('data');
            }));

            // console.log(responses);

            let weight = await getWeightModel();
            // console.log(weight);
            let ret = [];
            let lat, lon;
            for(lat = -12; lat <= 7; lat++) {
                for(lon = 94; lon <= 142; lon++) {
                    let sum = 0;
                    let idx = 0;
                    responses.forEach((val) => {
                        let tmp = val.find((v) => v.lat === lat && v.lon === lon);
                        if(tmp != undefined) {
                            sum = sum + tmp.value * weight[idx].weight;
                        }
                        idx++;
                        // console.log(sum);
                    });
                    ret.push({
                        lat,
                        lon,
                        value: sum
                    });
                }
            }

            // console.log(ret);

            response = ret;
        } else {
            response = await qb.select('lat, lon, value')
                .where({'model': model, 'type': type, 'year': year, 'month': month})
                .get('data');
        }
 
        console.log("Query Ran: " + qb.last_query());
 
        // [{name: 'Mercury', position: 1}, {name: 'Mars', position: 4}]
        // console.log("Results:", response);
    } catch (err) {
        return console.error("Uh oh! Couldn't get results: " + err.msg);
    } finally {
        qb.disconnect();
        return response;
    }
}

exports.getData = async () => {
    try {
        qb = await pool.get_connection();
        response = await qb.select('lat, lon, value')
            .get('data');
 
        console.log("Query Ran: " + qb.last_query());
 
        // [{name: 'Mercury', position: 1}, {name: 'Mars', position: 4}]
        // console.log("Results:", response);
    } catch (err) {
        return console.error("Uh oh! Couldn't get results: " + err.msg);
    } finally {
        qb.disconnect();
        return response;
    }
}