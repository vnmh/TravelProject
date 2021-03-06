const { config } = require('../config.js');
const mysql = require('../dbconnection.js');

//Task object constructor
const Tour = function (tour) {
   this.idTour = tour.idTour | 0;
   this.titleTour = tour.titleTour;
   this.price = tour.price;
   this.sale = tour.sale;
   this.departureDate = tour.departureDate.slice(0, 10).replace(/-/g, '/'); //Chúng ta cần format date lại khi đưa xuống CSDL;
   this.describe = tour.describe;
   this.address = tour.address;
   this.vocationTime = tour.vocationTime;
   this.idAccount = tour.idAccount;
   this.tags = tour.tags;
   this.services = tour.services;
   this.views = tour.views;
   this.votes = tour.votes;
   this.reuse = tour.reuse;
   this.type = tour.type;
   this.minAge = tour.minAge;
   this.groupSize = tour.groupSize;
   this.video = tour.video;
   this.schedule = tour.schedule;
   this.scheduleLoop = tour.scheduleLoop;
};

const databaseLocal = config.database;
const databaseProduction = process.env.NODE_ENV === 'production' ? process.env.JAWSDB_DATABASE : databaseLocal;

Tour.getAllTour = function (funcResult) {
   mysql.query('SELECT * FROM ' + databaseProduction + ".tours WHERE statusAction <> 'deleted';", function (err, res) {
      if (err) {
         funcResult(err, null);
      } else {
         funcResult(null, res);
      }
   });
};
Tour.getAllTourAll = function (funcResult) {
   mysql.query('SELECT * FROM ' + databaseProduction + '.tours;', function (err, res) {
      if (err) {
         funcResult(err, null);
      } else {
         funcResult(null, res);
      }
   });
};

Tour.getAllTourForUser = function (idAccount, funcResult) {
   mysql.query(
      'SELECT * FROM ' + databaseProduction + ".tours where idAccount = ? AND statusAction <> 'deleted'; ",
      [idAccount],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};
Tour.getAllTourForUserAll = function (idAccount, funcResult) {
   mysql.query(
      'SELECT * FROM ' + databaseProduction + '.tours where idAccount = ? ; ',
      [idAccount],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};

Tour.getAllTourSearch = function (searchs, funcResult) {
   if (searchs.conditional === 'name') {
      mysql.query(
         'call ' +
            databaseProduction +
            `.spsearchEngineTourByName( '${searchs.keySearch}', '${searchs.dayStart}', '${
               searchs.dayEnd
            }', ${10000000000} ); `,
         function (err, res) {
            if (err) {
               funcResult(err, null);
            } else {
               funcResult(null, res[0]);
            }
         }
      );
   } else if (searchs.conditional === 'landmark' || searchs.conditional === 'address') {
      mysql.query(
         'call ' +
            databaseProduction +
            `.spsearchEngineTourByAddress( '${searchs.keySearch}', '${searchs.dayStart}', '${
               searchs.dayEnd
            }', ${10000000000} ); `,
         function (err, res) {
            if (err) {
               funcResult(err, null);
            } else {
               funcResult(null, res[0]);
            }
         }
      );
   } else {
      mysql.query(
         'call ' +
            databaseProduction +
            `.spsearchEngineTour( '${searchs.keySearch}', '${searchs.dayStart}', '${
               searchs.dayEnd
            }', ${10000000000} ); `,
         function (err, res) {
            if (err) {
               funcResult(err, null);
            } else {
               funcResult(null, res[0]);
            }
         }
      );
   }
};

Tour.createTour = function (newTour, funcResult) {
   this.titleTour = newTour.titleTour;
   this.price = newTour.price;
   this.sale = newTour.sale;
   this.departureDate = newTour.departureDate;
   this.describe = newTour.describe;
   this.address = newTour.address;
   this.vocationTime = newTour.vocationTime;
   this.idAccount = newTour.idAccount;
   this.tags = newTour.tags;
   this.services = newTour.services;
   this.views = newTour.views;
   this.votes = newTour.votes;
   this.reuse = newTour.reuse;
   this.type = newTour.type;
   this.minAge = newTour.minAge;
   this.groupSize = newTour.groupSize;
   this.video = newTour.video;
   this.schedule = newTour.schedule;
   this.scheduleLoop = newTour.scheduleLoop;
   mysql.query(
      'INSERT INTO ' +
         databaseProduction +
         ".tours (`titleTour`, `price`, `sale`, `departureDate`, `describe`, `address`, `vocationTime`, `idAccount`, `tags`, `services`, `views`, `votes`, `reuse`, `type`, `minAge`, `groupSize`, `schedule`, `scheduleLoop`, `video`) VALUES ('" +
         this.titleTour +
         "', '" +
         this.price +
         "', '" +
         this.sale +
         "', '" +
         this.departureDate +
         "', '" +
         this.describe +
         "', '" +
         this.address +
         "', '" +
         this.vocationTime +
         "', '" +
         this.idAccount +
         "', '" +
         this.tags +
         "', '" +
         this.services +
         "', '" +
         this.views +
         "', '" +
         this.votes +
         "', '" +
         this.reuse +
         "', '" +
         this.type +
         "', '" +
         this.minAge +
         "', '" +
         this.groupSize +
         "', '" +
         this.schedule +
         "', '" +
         this.scheduleLoop +
         "', '" +
         this.video +
         "') ",
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};

Tour.getTourById = function (idTour, funcResult) {
   mysql.query(
      'SELECT * FROM ' + databaseProduction + ".tours  WHERE idTour = ? AND statusAction <> 'deleted';",
      [idTour],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};
Tour.getTourByIdAll = function (idTour, funcResult) {
   mysql.query(
      'SELECT * FROM ' + databaseProduction + ".tours  WHERE idTour = ? ;",
      [idTour],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};

Tour.getTourByIdWithIdAccount = function (idTour, idAccount, funcResult) {
   mysql.query(
      'SELECT * FROM ' +
         databaseProduction +
         ".tours  WHERE idTour = ? AND idAccount = ? AND statusAction <> 'deleted' ;",
      [idTour, idAccount],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};
Tour.getTourByIdWithIdAccountAll = function (idTour, idAccount, funcResult) {
   mysql.query(
      'SELECT * FROM ' +
         databaseProduction +
         ".tours  WHERE idTour = ? AND idAccount = ?  ;",
      [idTour, idAccount],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};
Tour.updateById = function (updateTour, funcResult) {
   updateTour = { ...updateTour, statusAction: 'edited' };
   mysql.query(
      'UPDATE ' + databaseProduction + '.tours SET ? WHERE (idTour = ?);',
      [updateTour, updateTour.idTour],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};
Tour.remove = function (idTour, funcResult) {
   mysql.query(
      'UPDATE ' + databaseProduction + ".tours SET `statusAction` = 'deleted' WHERE idTour = ?",
      [idTour],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};

Tour.createImageTour = function (idTour, name, funcResult) {
   var link = `/img/${name}`;
   var status = 'done';
   mysql.query(
      `INSERT INTO ${databaseProduction}.images (link, status, name, idTour) VALUES ('${link}', '${status}', ' ${name}' , '${idTour}')`,
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};

module.exports = Tour;
