var mysql = require("mysql");
const { configProduction, configHerokuTest } = require("./config");

//Tạm thời sẽ dùng callback cho các controller image, schedule, tour
//Các controller khác ta sẽ dùng mysql with Promise code trong file dbconnectMySql.js


const connection =
  process.env.NODE_ENV === "production"
    ? mysql.createConnection(configProduction)
    : mysql.createConnection(configHerokuTest);

module.exports = connection;
