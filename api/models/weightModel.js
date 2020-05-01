let response = null;
let qb = null;

const QueryBuilder = require('node-querybuilder');

const settings = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

const pool = new QueryBuilder(settings, 'mysql', 'pool');

exports.getWeightModel = async () => {
    try {
        qb = await pool.get_connection();
        console.log("test");

        response = await qb.select('model, weight').get('weight_model');

        console.log("Query Ran: " + qb.last_query());

    } catch (err) {
        return console.error("Uh oh! Couldn't get results: " + err.msg);
    } finally {
        qb.disconnect();
        return response;
    }
}

exports.updateWeightModel = async (data) => {
    try {
        qb = await pool.get_connection();

        data.forEach(async (e) => {
            await qb.set({'weight': e.weight})
                .where({'model': e.model})
                .update('weight_model');
        });
        
        qb.disconnect();

        return "success";
        
    } catch (err) {
        return console.error("Uh oh! Couldn't get results: " + err.msg);
    }
}