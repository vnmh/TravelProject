const { config } = require('../config.js');
const mysql = require('../dbconnection.js');

//Task object constructor
const Order = function (order) {
   this.idOrder = order.idOrder || 0;
   this.PIN = order.PIN || 0;
   this.status = order.status || 'verify';
   this.totalPrice = order.totalPrice || 0;
   this.numberPeople = order.numberPeople || 1;
   this.address = order.address || ' ';
   this.phone = order.phone || ' ';
   this.email = order.email || ' ';
   this.notes = order.notes || ' ';
   this.idAccount = order.idAccount;
   this.buyer = order.buyer || ' ';
   this.paymentMethod = order.paymentMethod || ' ';
   this.idTour = order.idTour || ' ';
   this.departureDay = order.departureDay;
   this.vocationTime = order.vocationTime;
};

const databaseLocal = config.database;
const databaseProduction = process.env.NODE_ENV === 'production' ? process.env.JAWSDB_DATABASE : databaseLocal;

Order.getAllOrder = function (funcResult) {
   mysql.query('SELECT * FROM ' + databaseProduction + ".orders WHERE statusAction <> 'deleted';", function (err, res) {
      if (err) {
         funcResult(err, null);
      } else {
         funcResult(null, res);
      }
   });
};

Order.getAllOrderForUser = function (idAccount, funcResult) {
   mysql.query(
      'SELECT * FROM ' + databaseProduction + ".orders where idAccount = ? AND WHERE statusAction <> 'deleted'; ",
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

Order.createOrder = function (newOrder, funcResult) {
   this.PIN = newOrder.PIN;
   this.status = newOrder.status;
   this.totalPrice = newOrder.totalPrice;
   this.numberPeople = newOrder.numberPeople;
   this.paymentMethod = newOrder.paymentMethod;
   this.address = newOrder.address;
   this.phone = newOrder.phone;
   this.email = newOrder.email;
   this.notes = newOrder.notes;
   this.idAccount = newOrder.idAccount;
   this.buyer = newOrder.buyer;
   this.idTour = newOrder.idTour;
   this.departureDay = newOrder.departureDay;
   this.vocationTime = newOrder.vocationTime;

   mysql.query(
      'INSERT INTO ' +
         databaseProduction +
         '.orders (`PIN`, `status`, `totalPrice`, `numberPeople`,' +
         ' `address`, `phone`,`email`,`notes`,' +
         (this.idAccount ? ' `idAccount`,' : ' ') +
         " `buyer`, `idTour`, `departureDay`, `vocationTime`, `paymentMethod` ) VALUES ('" +
         this.PIN +
         "', '" +
         this.status +
         "', '" +
         this.totalPrice +
         "', '" +
         this.numberPeople +
         "', '" +
         this.address +
         "', '" +
         this.phone +
         "', '" +
         this.email +
         "', '" +
         this.notes +
         "', " +
         (this.idAccount ? " '" + this.idAccount + "'," : ' ') +
         " '" +
         this.buyer +
         "', '" +
         this.idTour +
         "', '" +
         this.departureDay +
         "', '" +
         this.vocationTime +
         "', '" +
         this.paymentMethod +
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

Order.getOrderById = function (idOrder, funcResult) {
   mysql.query(
      'SELECT * FROM ' + databaseProduction + ".orders  WHERE idOrder = ? AND statusAction <> 'deleted';",
      [+idOrder],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};
Order.getOrderByPIN = function (PIN, funcResult) {
   mysql.query(
      'SELECT * FROM ' + databaseProduction + ".orders  WHERE PIN = ? AND statusAction <> 'deleted';",
      [PIN],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};
Order.getOrderByEmail = function (email, funcResult) {
   mysql.query(
      'SELECT * FROM ' +
         databaseProduction +
         ".orders inner join tours on tours.idTour = orders.idTour WHERE email = ? AND orders.statusAction <> 'deleted'",
      [email],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};
Order.getOrdersWithIdTour = function (idTour, funcResult) {
   mysql.query(
      'SELECT * FROM ' +
         databaseProduction +
         ".tours inner join orders on tours.idTour = orders.idTour WHERE orders.idTour = ? AND orders.statusAction <> 'deleted'",
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
Order.getOrderByIdWithIdAccount = function (idOrder, idAccount, funcResult) {
   mysql.query(
      'SELECT * FROM ' +
         databaseProduction +
         ".orders  WHERE idOrder = ? AND idAccount = ? AND WHERE statusAction <> 'deleted';",
      [idOrder, idAccount],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};

Order.updateById = function (updateOrder, funcResult) {
   updateOrder = { ...updateOrder, statusAction: 'edited' };
   mysql.query(
      'UPDATE ' + databaseProduction + '.orders SET ? WHERE (idOrder = ?);',
      [updateOrder, updateOrder.idOrder],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};

Order.updateByPIN = function (updateOrder, funcResult) {
   updateOrder = { ...updateOrder, statusAction: 'edited' };
   mysql.query(
      'UPDATE ' + databaseProduction + '.orders SET ? WHERE (PIN = ?);',
      [updateOrder, updateOrder.PIN],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};

Order.remove = function (idOrder, funcResult) {
   mysql.query(
      'UPDATE ' + databaseProduction + ".orders SET `statusAction` = 'deleted' WHERE idOrder = ?",
      [idOrder],
      function (err, res) {
         if (err) {
            funcResult(err, null);
         } else {
            funcResult(null, res);
         }
      }
   );
};

module.exports = Order;
