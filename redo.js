
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
function sha256(content) {  
  return crypyo.createHash('sha256').update(content).digest('binary')
}
var self ;
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
              self = this;
                console.log(this.location);
              }
              #databasedata
              #refreshdata(){
                this.#databasedata = JSON.parse(fs.readFileSync(this.location,'utf8'));
              }

              addacount(username, pw) {
                this.#refreshdata();
                var password = sha256(pw);
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
              login(...args){
                return new class user{
                  #unencripted
                  #username
                  #password
                  #userdata
                  #databasedata
                  #refreshdata(){
                    this.#databasedata = JSON.parse(fs.readFileSync(self.location,'utf8'));
                  }
                  #refreshud(){
                    this.#refreshdata();
                    this.#userdata = this.#databasedata[this.#username];
                  }
                  #decript(){
                    this.#refreshdata();
                    this.#unencripted = JSON.parse(aes256.decrypt(this.#password, this.#userdata["data"]));
                  }
                  constructor(username, password){
                    this.#username = username;
                    this.#password = password;
                    this.#refreshud();
                    if (this.#userdata == undefined) {
                      console.log("no acount");
                      return false;
                    } else if (this.#userdata.password != sha256(password)) {
                      throw new Error("incorect passowrd");
                    } else if (this.#userdata.password === sha256(password)) {
                      try {
                        this.#decript();
                        console.log(this.#unencripted);
                      } catch (err) {
                        console.error(err);
                        return false;
                      }
                    }
                  }
                }(...args)
              }
          
          }(...args)
      }
}
//var database = require("./redo.js")
//database.get("tests/databases/foodata.json").login("chicen", "bocker99")
//database.get("tests/databases/foodata.json").addacount("chicen", "bocker99");
