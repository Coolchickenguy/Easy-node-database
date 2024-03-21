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
                var methods = new class methods{
                  unencripted
                  username
                  password
                  userdata
                  databasedata
                  refreshdata(){

                    this.databasedata = JSON.parse(fs.readFileSync(self.location,'utf8'));
                  }
                  refreshud(){
                    this.refreshdata();
                    this.userdata = this.databasedata[this.username];
                  }
                  decript(reed){
                    if(!reed){
                    this.refreshud();
                    }
                    this.unencripted = JSON.parse(aes256.decrypt(this.password, this.userdata["data"]));

                  }
                }
                return new class user{
                 
                  constructor(username, password){
                    methods.username = username;
                    methods.password = password;
                    methods.refreshud();
                    if (methods.userdata == undefined) {
                      throw new Error("no acount");
                    } else if (methods.userdata.password != sha256(password)) {
                      throw new Error("incorect passowrd");
                    } else if (methods.userdata.password === sha256(password)) {
                      try {
                        methods.decript();
                        console.log(methods.unencripted);
                      } catch (err) {
                        console.error(err);
                        return false;
                      }
                    }
                  }
                  get(){
                    methods.decript();
                   // var dbd = this.#databasedata;

                   var targetProxy = new Proxy(methods.unencripted, {
                    set: function (target, key, value) {
                      methods.decript();
                      console.log(methods.unencripted,"yep")
                      //var target = methods.unencripted;
                      console.log(`${key} set to ${value}`);
                      target[key] = value;
                      var temp = methods.databasedata;
                      temp[methods.username]["data"] = aes256.encrypt(methods.password, JSON.stringify(target));
                      fs.writeFileSync(self.location, JSON.stringify(temp));
                      console.log(target)
                      return true;
                    },
                    get: function(target, prop, receiver) {
                      methods.decript()
                      //var target = methods.unencripted;
                      return Reflect.get(target, prop, receiver)
                    }
                  });
                    return targetProxy;
                  }
                }(...args)
              }
          
          }(...args)
      }
}
/*
var database = require("./redo.js");
database.get("tests/databases/foodata.json").login("chicen", "bocker99").get().hi = 1;
database.get("tests/databases/foodata.json").addacount("chicen", "bocker99");
var data = database.get("tests/databases/foodata.json").login("chicen", "bocker99").get();

*/