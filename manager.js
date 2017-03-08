var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'Bamazon', 
});

var inventoryUpdate = [];
var addItem = [];

connection.connect();

// Prompts the user with options for each of our objectives.

//creates the prompt that will be loaded when the app loads
var managerOptions = {
	properties:{
		mOptions:{
			description: colors.green('Key in one of the following options: 1) View Products for Sale 2) View Low Inventory 3) Add to Inventory 4) Add New Product')
		},
	},
};

//start the prompt
prompt.start();
//this prompts the above question and below it states what will be done based on what number the user types
prompt.get(managerOptions, function(err, res){
	if(res.mOptions == 1){
		viewProducts();
	} else if(res.mOptions == 2){
		viewInventory();
	} else if(res.mOptions == 3){
		addInventory();
	} else if(res.mOptions ==4){
		addNewItem();
	} else {
		console.log('You picked an invalid choice. Please choose option 1, 2 ,3 or 4');
		connection.end();
	}
});

//this is the function for option 1 of the question above.
var viewProducts = function(){
	//connects to the mysql database called products and returns the information from that database
	connection.query('SELECT * FROM Products', function(err, res){
		console.log('');
		console.log('Products for Sale')
		console.log('');	

		//this creates a table outline in the node app to organize the data
		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['green'],
				compact: false,
				colAligns: ['center'],
			}
		});

		//this loops through the mysql connection and for each item that is returned, the information is then pushed to the table
		for(var i=0; i<res.length; i++){
			table.push(
				[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			);
		}

		//displays the table and ends connection to server 
		console.log(table.toString());
		connection.end();
	})
};

//this creates the function for the second option from the prompt
var viewInventory = function(){

	//starts the connection to the mysql database Products and only returns items that have a stock quantity of less than 2
	connection.query('SELECT * FROM Products WHERE stock_quantity < 2', function(err, res){
		console.log('');
		console.log('Items With Low Inventory');
		console.log('');

		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['green'],
				compact: false,
				colAligns: ['center'],
			}
		});

		//loops through the data returned from mysql and pushes it into the table to be logged on the console
		for(var i=0; i<res.length; i++){
			table.push(
				[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			);
		}

		console.log(table.toString());
		connection.end();
	})
};

//creates the function for the third option of the prompt
var addInventory = function(){
	//this adds the variable that will prompt the information needed to replenish the stock quantity of a certain item from the product list
	var addInvt = {
		properties:{
			inventoryID: {
				description: colors.green('What is the ID number of the product you want to add inventory for?')
			},
			inventoryAmount:{
				description: colors.green('How many items do you want to add to the inventory?')
			}
		},
	};

	prompt.start();

	//get the information entered in response to the prompt above
	prompt.get(addInvt, function(err, res){

		//creates a variable for the answers to the prompt questions
		var invtAdded = {
			inventoryAmount: res.inventoryAmount,
			inventoryID: res.inventoryID,
		}

		//pushes the responses to the inventoryUpdate array created at the top of this page
		inventoryUpdate.push(invtAdded);

		//connect to the mysql database Products and sets the stock quanitity to the number entered in the prompt above + the current stock quantity for a specific item iD
		connection.query("UPDATE Products SET stock_quantity = (stock_quantity + ?) WHERE item_id = ?;", [inventoryUpdate[0].inventoryAmount, inventoryUpdate[0].inventoryID], function(err, result){

			if(err) console.log('error '+ err);

			//then this selects the newly updated information from the mysql database so we can console.log a confirmation to the user with the updated stock amount
			connection.query("SELECT * FROM Products WHERE item_id = ?", inventoryUpdate[0].inventoryID, function(error, resOne){
				console.log('');
				console.log('The new updated stock quantity for id# '+inventoryUpdate[0].inventoryID+ ' is ' + resOne[0].stock_quantity);
				console.log('');
				connection.end();
			})

		})
	})
};

//creates the function for the last option above
var addNewItem = function(){
	//creates the variable newItem which contains the questions that are to be prompted to the user
	var newItem = {
		properties: {
			newIdNum:{ description: colors.gray('Please enter a unique item Id #')},
			newItemName:{ description: colors.gray('Please enter the name of the product you wish to add')},
			newItemDepartment: { description: colors.gray('What department does this item belong in?')},
			newItemPrice: { description: colors.gray('Please enter the price of the item in the format of 00.00')},
			newStockQuantity: { description: colors.gray('Please enter a stock quantity for this item')},
		}
	}

	prompt.start();

	//gets the responses for the prompt above
	prompt.get(newItem, function(err, res){

		//creates a variable for the responses to be logged to
		var newItem = {
			newIdNum: res.newIdNum,
			newItemName: res. newItemName,
			newItemDepartment: res.newItemDepartment,
			newItemPrice: res.newItemPrice,
			newStockQuantity: res.newStockQuantity,

		};

		//pushes the variable and the response data to the addItem array defined at the top of this page
		addItem.push(newItem);

		//connects to mysql and inserts the responses to the prompt into the mysql database to create a new product within the database
		connection.query('INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?, ?);', [addItem[0].newIdNum, addItem[0].newItemName, addItem[0].newItemDepartment, addItem[0].newItemPrice, addItem[0].newStockQuantity], function(err, result){

			if(err) console.log('Error: ' + err);

			console.log('New item successfully added to the inventory!');
			console.log(' ');
			console.log('Item Id#: ' + addItem[0].newIdNum);
			console.log('Item name: ' + addItem[0].newItemName);
			console.log('Department: ' + addItem[0].newItemDepartment);
			console.log('Price: $' + addItem[0].newItemPrice);
			console.log('Stock Quantity: ' + addItem[0].newStockQuantity);

			connection.end();
		})
	})
};