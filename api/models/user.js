const bcrypt = require('bcrypt');
let qb = null;

const QueryBuilder = require('node-querybuilder');

const settings = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

const pool = new QueryBuilder(settings, 'mysql', 'pool');

// exports.register = async (username, password) => {
//     try {
//         const settings = {
//             host: process.env.DB_HOST,
//             database: process.env.DB_NAME,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASS,
//         };
//         const pool = new QueryBuilder(settings, 'mysql', 'pool');

//         qb = await pool.get_connection();

//         await bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
//             if (err) {
//               return err;
//             }
//             else {
//                 // console.log(username, password);

//                 response = await qb.returning('id').insert('user', {username: username, password: hashedPassword});
         
//                 console.log("Query Ran: " + qb.last_query());
//                 qb.disconnect();
                
//                 return response;
//             }
//         });
//     } catch (err) {
//         return console.error("Uh oh! Couldn't get results: " + err.msg);
//     }
// }

exports.login = async (username, password) => {
    try {
        qb = await pool.get_connection();

        const response = await qb.select('password')
            .where({'username': username})
            .get('user');
        
        qb.disconnect();

        if(!response.length)
            return "failed";
        
        const match = await bcrypt.compare(password, response[0].password);

        if(!match)
            return "failed";

        return "success";
        
    } catch (err) {
        return console.error("Uh oh! Couldn't get results: " + err.msg);
    }
}