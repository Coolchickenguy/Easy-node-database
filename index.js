var e = exports
var fs = require("fs")
var crypyo = require('crypto');
var aes256 = require('aes256');
/**
 * Returns a SHA256 hash using SHA-2 for the given `content`.
 *
 * @see https://en.wikipedia.org/wiki/SHA-2
 * 
 * @param {String} content
 *
 * @returns {String}
 */
function sha256(content) {  
  return crypyo.createHash('sha256').update(content).digest('binary')
}

e.new = function(name,location,overwrite) {
 
  if(location && location[location.length-1] != "/"){
    location= location + "/" + name
  }
  if(!location){
    location="./" + name;
  }
  location += ".json"
  //location ||= ("./" + name + ".json");
  if(fs.existsSync(location)&&(!overwrite == true)){
    throw new Error("File already exists")
  }
  console.log(location)
  fs.writeFileSync(location,"{}")
}
e.get = function(location){
  var location = location + ".json";
try{


}catch(err){
  console.error(err);
}
  var fin = function(){ return JSON.parse(fs.readFileSync(location,'utf8'));}
  function subs(){}
  
subs.prototype.login = function(username,password){

  if(fin()[username] == undefined ){
    console.log("no acount")
    return false;
  }else if(fin()[username].password != sha256(password)){
    throw new Error("incorect passowrd")
    //return false;
  } else if(fin()[username].password === sha256(password)){
    //console.log("york")
    try{
     var getdc = function(){return JSON.parse(aes256.decrypt(password.split("").reverse().join(""),fin()[username]["data"]))}
      var dc = getdc()
    }catch(err){
      console.error(err)
      return false;
    }

    function blubs(){}
    blubs.prototype.get = function(){
      var targetProxy = new Proxy(dc, {
        set: function (target, key, value) {
            console.log(`${key} set to ${value}`);
          target = getdc()
            target[key] = value;
          var temp = fin();
          temp[username]["data"] = aes256.encrypt(password,JSON.stringify(target))
          fs.writeFileSync(location, JSON.stringify(temp))
            return true;
        }
      });
      return targetProxy;
    }
    return new blubs;
  }
}

  subs.prototype.addacount = function(username,pw){
    var password = sha256(pw);
    if(fin()[username] != undefined){
      //console.error("username taken");
      throw new Error("username taken");
      //return "username taken";
    }
    var temp = fin();
    temp[username] ={"username": username,
    "password" : password,
    "data" : aes256.encrypt(pw,"{}")}
     fs.writeFileSync(location, JSON.stringify(temp))
    return [username,password]
  }
var subsi = new subs;
return subsi
  //return {"log" : function(){return json}};
}


if (require.main === module) {
//For testing
 /* console.log(e.get("MAIN"));
//e.get("buck.json").get()["asdsdasa"] = "brocasdk"
  console.log(e.get("buck.json").addacount("chicen", "bocker99"))
  //console.log(e.get("buck.json").get())
  e.get("buck.json").login("chicen", "bocker99").get()["yadasdr"] = "bbaasds"
  console.log(e.get("buck.json").login("chicen", "bocker99").get())*/
  //console.log(e.get("buck.json").addacount("chicen", "bocker99"));
  //e.get("buck.json").login("chicen", "bocker99").get()["yadasdr"] = "bbaasds"
  //console.log(e.get("buck.json").login("chicen", "bocker99").get());
 // e.new("ds.json","./jsons")
}