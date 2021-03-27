module.exports.config = {
   host: 'travel.ctk6dwvqhecf.ap-southeast-1.rds.amazonaws.com',
   user: 'admin',
   port: '3306',
   password: '123456aA',
   database: 'travel_project'
};

module.exports.configHerokuTest = {
   host: 'travel.ctk6dwvqhecf.ap-southeast-1.rds.amazonaws.com',
   user: 'admin',
   port: '3306',
   password: '123456aA',
   database: 'travel_project'
};

module.exports.configProduction = {
   host: process.env.JAWSDB_HOST,
   user: process.env.JAWSDB_USERNAME,
   port: process.env.JAWSDB_PORT,
   password: process.env.JAWSDB_PASSWORD,
   database: process.env.JAWSDB_DATABASE
};
