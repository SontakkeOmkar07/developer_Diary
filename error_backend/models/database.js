import mysql2 from 'mysql2';

 const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"Create@databasein2468Mysql",
    database:"users_data",



});


    db.connect((err) =>{
                if(err){

                    console.error("DB error", err);


                }
                console.log("Database connected successfully.");
            });






export default db;



