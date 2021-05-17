const { config } = require("../config");
const database = require("../dbconnectMySql");

//Task object constructor
const Service = function(service) {
  this.idServices = service.idServices | 0;
  this.titleService = service.titleService;
  this.description = service.description;
};

const databaseLocal = config.database;
const databaseProduction =
  process.env.NODE_ENV === "production"
    ? process.env.JAWSDB_DATABASE
    : databaseLocal;

Service.getAllService = function() {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "SELECT * FROM " +
          databaseProduction +
          ".services WHERE statusAction <> 'deleted'; "
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Service.getServiceById = function(idServices) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "SELECT * FROM " +
          databaseProduction +
          ".services where idServices = ? AND statusAction <> 'deleted'; ",
        [idServices]
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Service.getAllServiceSearch = function(searchs) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "call " +
          databaseProduction +
          `.spSearchEngineService( '${searchs.keySearch}' ); `
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Service.createService = function(newService) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "INSERT INTO " +
          databaseProduction +
          ".services (`titleService`, `description`) VALUES ('" +
          newService.titleService +
          "', '" +
          newService.description +
          "') "
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Service.updateById = function(updateService) {
  updateService = { ...updateService, statusAction: "edited" };
  return new Promise(function(resolve, reject) {
    database
      .query(
        "UPDATE " +
          databaseProduction +
          ".services SET ? WHERE (idServices = ?);",
        [updateService, updateService.idServices]
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Service.remove = function(idServices) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "UPDATE " +
          databaseProduction +
          ".services SET `statusAction` = 'deleted' WHERE idServices = ?",
        [idServices]
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

module.exports = Service;
