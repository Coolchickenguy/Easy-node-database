# Database for node
## A database that works


## Use:

**Get a databse and login**
***
```
var database = require("easynodedatabase");
var data = database.get("./databases/foodata").login("chicen", "bocker99").get();
console.log(data);
//Outputs content
```
**Edit a database**
***
```
var database = require("easynodedatabase");
var data = database.get("./databases/foodata").login("chicen", "bocker99").get();
data["foo"] = "bar";
//updates database
```
**Add account**
***
```
var database = require("easynodedatabase");
database.get("./databases/foodata").addacount("chicen", "bocker99");
```
**Create database**
```
var database = require("easynodedatabase");
database.new("foodata","./databases");
```
## License

MIT