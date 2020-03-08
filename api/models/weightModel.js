const QueryBuilder = require('node-querybuilder');
const bcrypt = require('bcrypt');

const saltRounds = 10;

let response = null;
let qb = null;

exports.getWeightModel = async () => {
    try {
        const settings = {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        };
        const pool = new QueryBuilder(settings, 'mysql', 'pool');

        qb = await pool.get_connection();

        response = await qb.select('model, weight').get('weight_model');

        console.log("Query Ran: " + qb.last_query());

    } catch (err) {
        return console.error("Uh oh! Couldn't get results: " + err.msg);
    } finally {
        qb.disconnect();
        return response;
    }
}

exports.updateWeightModel = async (model, weight) => {
    try {
        const settings = {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        };
        const pool = new QueryBuilder(settings, 'mysql', 'pool');

        qb = await pool.get_connection();

        const response = await qb.set({'weight': weight})
            .where({'model': model})
            .update('weight_model');
        
        qb.disconnect();

        return response;
        
    } catch (err) {
        return console.error("Uh oh! Couldn't get results: " + err.msg);
    }
}