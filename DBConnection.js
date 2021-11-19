const mysql = require('mysql');
//function for making a new connection
function newConnection()
{
    let conn = mysql.createConnection({
        host:'35.226.253.157',
        user: 'root',
        password:'mypassword',
        database:'newDB'
    });
    
    return conn;
}
module.exports = newConnection;