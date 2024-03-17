
var fs = require("fs")
var crypyo = require('crypto');
var aes256 = require('aes256');
/**
 * Returns a location for the given `name` and `location`.
 * 
 * @param {String} name The file name or raw path.
 *
 * @param {String} location The location to put the file (optional).
 *
 * @returns {String}
 */
function pathtopath(name,location){
    if(location && location[location.length-1] != "/"){
        location= location + "/" + name;
      }
      if(!location){
        location=(name.startsWith("./") ? "" : "./") + name;
      }
      if(!/\.json$/.test(location)){location += ".json";}
      return location
}
module.exports = class main{
    constructor(){
        console.log("test")
    }
   
    static new(name,location,overwrite) {
location = pathtopath(name,location)
        if(fs.existsSync(location)&&(!overwrite == true)){
          throw new Error("File already exists");
        }
        console.log(location);
        fs.writeFileSync(location,"{}");

      }
      static get(...args){
        return new class get{
            location;
            constructor(name,location){
                this.location = pathtopath(name,location)

                console.log(this.location);
              }
              #sha256(content) {  
                return crypyo.createHash('sha256').update(content).digest('binary')
              }
              #databasedata
              #refreshdata(){
                this.#databasedata = JSON.parse(fs.readFileSync(this.location,'utf8'));
              }
              addacount(username, pw) {
                this.#refreshdata();
                var password = this.#sha256(pw);
                if (this.#databasedata[username] != undefined) {
                  //console.error("username taken");
                  throw new Error("username taken");
                  //return "username taken";
                }
                var temp = this.#databasedata;
                temp[username] = {
                  "username": username,
                  "password": password,
                  "data": aes256.encrypt(pw, "{}")
                };
                fs.writeFileSync(this.location, JSON.stringify(temp));
                return [username, password];
              }
              login(username, password) {
                this.#refreshdata();
                var userdata = this.#databasedata[username];
                if (userdata == undefined) {
                  console.log("no acount");
                  return false;
                } else if (userdata.password != this.#sha256(password)) {
                  throw new Error("incorect passowrd");
                } else if (userdata.password === this.#sha256(password)) {
                  try {
                    var getdc = function () {
                      console.log(aes256.decrypt(password, userdata["data"]));
                      return JSON.parse(aes256.decrypt(password, userdata["data"]));
                    };
                    var dc = getdc();
                  } catch (err) {
                    console.error(err);
                    return false;
                  }
                }
              }          
          }(...args)
      }
}
// cd node_modules/easynodedatabase
//var database = require("./redo.js")
