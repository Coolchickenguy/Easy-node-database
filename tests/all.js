var database = require("easynodedatabase");
database.new("foodata","./databases",true);
database.get("./databases/foodata").addacount("chicen", "bocker99");
var data = database.get("./databases/foodata").login("chicen", "bocker99").get();
data["foo"] = "bar";
console.log(data)
var expected = {};
expected["foo"] = "bar";
console.log(`Expected value:${JSON.stringify(expected)}`)