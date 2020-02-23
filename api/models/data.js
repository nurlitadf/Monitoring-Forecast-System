const QueryBuilder = require('node-querybuilder');
 
let response = null;
let qb = null;

const getData = async (model, month, year) => {
    try {
        const settings = {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        };
        const pool = new QueryBuilder(settings, 'mysql', 'pool');

        qb = await pool.get_connection();
        response = await qb.select('latitude, longitude, value')
            .where({'model': model, 'year': year, 'month': month})
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
 
module.exports = getData;