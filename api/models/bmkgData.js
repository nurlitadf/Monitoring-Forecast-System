const QueryBuilder = require('node-querybuilder');
 
let response = null;
let qb = null;

exports.getInitialTime = async () => {
    try {
        const settings = {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        };
        const pool = new QueryBuilder(settings, 'mysql', 'pool');

        qb = await pool.get_connection();
        response = await qb.distinct().select('initial_time')
            .get('data_bmkg');
 
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

exports.getBMKGData = async (initialTime, leadTime) => {
    try {
        const settings = {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        };
        const pool = new QueryBuilder(settings, 'mysql', 'pool');

        qb = await pool.get_connection();
        response = await qb.select('link')
            .where({'initial_time': initialTime, 'lead_time': leadTime})
            .get('data_bmkg');
 
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