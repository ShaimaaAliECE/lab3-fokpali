const mysql = require('mysql');
//creates connection using my GCP info
let conn = mysql.createConnection({
            host:'35.226.253.157',
            user: 'root',
            password:'mypassword',
            database:'newDB'
});
//connects
conn.connect();
//drops all pre-stored values
conn.query(`DROP TABLE Times`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Table Dropped');
                
                });
//creates a new table
conn.query(`CREATE TABLE Times
            (
                Name varchar(16),
                Option1 varchar(100),
                Option2 varchar(100),
                Option3 varchar(100),
                Option4 varchar(100),
                Option5 varchar(100),
                Option6 varchar(100),
                Option7 varchar(100),
                Option8 varchar(100),
                Option9 varchar(100),
                Option10 varchar(100)
            );` 

            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })

conn.end();