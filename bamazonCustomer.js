var mysql = require("mysql");
var inquirer = require("inquirer"); //using for prompts
// var table = require("console.table"); 
var colors = require("colors"); 

var conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "krish",
  database: "bamazon"
});

conn.connect(function(err) {
  if(err) throw err;
  console.log("Connected as id " + conn.threadId);
  inventory(); 
}); 

function inventory() {
    conn.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // logs the actual query being run
    console.log("Here is a list of all the products with their IDs and their individual prices, HAPPY SHOPPING!"); 
    console.log("----------------------------------------------------------------------------------------");
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price);
    }
    console.log("-----------------------------------");
    purchase(); //have this function inside the callback function 
  });

  function purchase() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is the ID of the product you want to purchase?",
          validate: function(val) {
            if (isNaN(val) || val === "") {
              return "Enter a valid number";
            }else{
              return true; 
            }
            }
        },
        {
          name: "unit",
          type: "input",
          message: "How many units of the product would you like to buy?",
          validate: function(val) {
          if (isNaN(val) || val === "") {
            return "Enter a valid number";
          }else{
            return true; 
          }
          }
        },
      ])
      .then(function(answer) {
        // console.log(answer); 
        conn.query("SELECT * FROM products WHERE ?", {item_id : answer.id}, function(err, res) {//answer.id is replacing the ? for finding the id
          if(err) throw err; 
          //check if enough stock available
          if(res[0].item_id == answer.id && res[0].stock_quantity >= parseInt(answer.unit)){ 
            var totalPrice = res[0].price * parseInt(answer.unit); 
            console.log(colors.green("ITEM PURCHASED!!")); 
            // console.log("You just spent: " + "$" + totalPrice); 
            console.log("------------------------------------------------------------------");
          
            conn.query("UPDATE products SET ? WHERE ?", [{stock_quantity: res[0].stock_quantity - parseInt(answer.unit)}, {item_id: answer.id}], function(err, res){
                // setTimeout(inventory, 2000); 
                console.log("You just spent: " + "$" + totalPrice); 
                restart(); 
            })

          //check if the IDs match and input unit is greater than quantity    
          }else if (res[0].item_id == answer.id && res[0].stock_quantity <= parseInt(answer.unit)){ 
            console.log(colors.red("INSUFFICIENT QUANTITY--- pick another amount of this ID!")); 
            inventory(); 
          }
        });
      });
  }
}

//restart function to see if user wants to keep buying or exit
function restart(){
  inquirer
      .prompt([
        {
          name: "eval",
          type: "input",
          message: "Do you want to keep browsing?[y/n]",
      }]).then(function(answer){
        if(answer.eval === "y"){
          inventory(); 
        }else{
          console.log(colors.yellow("THANKS FOR SHOPPING WITH BAMAZON!")); 
          conn.end(); 

        }
      })
}
