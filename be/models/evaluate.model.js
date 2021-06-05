const { config } = require("../config");
const database = require("../dbconnectMySql");

//Task object constructor
const Evaluate = function(evaluate) {
  this.idEvaluate = evaluate.idEvaluate | 0;
  this.numberStarService = evaluate.numberStarService;
  this.numberStarLocation= evaluate.numberStarLocation;
  this.numberStarMoney = evaluate.numberStarMoney;
  this.numberStarCleanliness = evaluate.numberStarCleanliness;
  this.numberStarFacilities = evaluate.numberStarFacilities;
  this.title = evaluate.title;
  this.contentEvaluate = evaluate.contentEvaluate;
  this.email = evaluate.email;
  this.idTour = evaluate.idTour;
  this.rateAverage = evaluate.rateAverage;
  this.rateTitle = evaluate.rateTitle;
  this.typeEvaluate = evaluate.typeEvaluate;
};

const databaseLocal = config.database;
const databaseProduction =
  process.env.NODE_ENV === "production"
    ? process.env.JAWSDB_DATABASE
    : databaseLocal;

Evaluate.getEvaluateById = function(idEvaluate) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "call " + databaseProduction + `.spGetEvaluateById( '${idEvaluate}' ); `
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Evaluate.getEvaluateByIdTour = function(idTour) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "call " + databaseProduction + `.spGetEvaluateByIdTour( '${idTour}' ); `
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Evaluate.createEvaluate = function(newEvaluate) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "INSERT INTO " +
          databaseProduction +
          ".evaluates (`numberStarService`, `numberStarLocation`, `numberStarMoney`, `numberStarCleanliness`, `numberStarFacilities`, `title`, `contentEvaluate`, `email`, `idTour`, `rateAverage`, `rateTitle`, `typeEvaluate`) VALUES ('" +
          newEvaluate.numberStarService +
          "', '" +
          newEvaluate.numberStarLocation+
          "', '" +
          newEvaluate.numberStarMoney +
          "', '" +
          newEvaluate.numberStarCleanliness +
          "', '" +
          newEvaluate.numberStarFacilities +
          "', '" +
          newEvaluate.title +
          "', '" +
          newEvaluate.contentEvaluate +
          "', '" +
          newEvaluate.email +
          "', '" +
          newEvaluate.idTour +
          "', '" +
          newEvaluate.rateAverage +
          "', '" +
          newEvaluate.rateTitle +
          "', '" +
          newEvaluate.typeEvaluate +
          "') "
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Evaluate.updateById = function(updateEvaluate) {
  updateEvaluate = { ...updateEvaluate, statusAction: "edited" };
  return new Promise(function(resolve, reject) {
    database
      .query(
        "UPDATE " +
          databaseProduction +
          ".evaluates SET ? WHERE (idEvaluate = ?);",
        [updateEvaluate, updateEvaluate.idEvaluate]
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

Evaluate.remove = function(idEvaluate) {
  return new Promise(function(resolve, reject) {
    database
      .query(
        "UPDATE " +
          databaseProduction +
          ".evaluates SET `statusAction` = 'deleted' WHERE idEvaluate = ?",
        [idEvaluate]
      )
      .then(rows => resolve(rows))
      .catch(err => reject(err));
  });
};

module.exports = Evaluate;
