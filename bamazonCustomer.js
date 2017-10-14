var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllProducts();
});
function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity
      );
    }
    customerQuestions();
  });
}
function queryItemID(item_id, stock_quantity) {
  connection.query("SELECT * FROM products WHERE item_id = ?", [item_id], function(err, res) {
    if (res.length === 1) {
      console.log(res[0].item_id + " | " + res[0].product_name + " | " + res[0].price + " | " + res[0].stock_quantity
      );
      if (stock_quantity <= res[0].stock_quantity) {
        updateMySql(item_id, res[0].stock_quantity - stock_quantity);
        console.log("Your Order Has Been Placed");
        console.log("The total cost of your order is " + (res[0].price * stock_quantity));
      }
      else {
        console.log("Insufficient Quantity! Please select a quantity not to exceed " + res[0].stock_quantity);
      }
      connection.end();
    }
  });
}

function customerQuestions() {
  inquirer.prompt([
    {
      name: "item_id",
      message: "What is the id of the product you would like to purchase?"
    }, {
      name: "stock_quantity",
      message: "How many units of this product would you like to purchase?"
    }, 
  ]).then(function(answers) {
    console.log(answers);
    queryItemID(answers.item_id, answers.stock_quantity);
  });
}

function updateMySql(item_id, stock_quantity) {
  connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [stock_quantity, item_id], function (err, res, fields) {
    if (err) {
      console.log("error", err);
    }
    else {
      console.log("results", res);

    }
  });
}
     
      // var newPlayer = new Player(
      //   answers.name,
      //   answers.position,
      //   answers.offense,
      //   answers.defense);
      // printInfo method is run to show that the newguy object was successfully created and filled
      // playerArray.push(newPlayer);
      // add one to count to increment our recursive loop by one
      // count++;
      // run the askquestion function again so as to either end the loop or ask the questions again
      // inputPlayer();
    // });
    // else statement which prints "all questions asked" to the console
    // when the code has been run five times
//   }
//   else {
//     console.log("All data collected");
//     console.log(playerArray);
//   }
// };
// inputPlayer();

// var playerArray = [];



// function queryDanceSongs() {
//   var query = connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function(err, res) {
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//     }
//   });
  // logs the actual query being run
//   console.log(query.sql);
// }