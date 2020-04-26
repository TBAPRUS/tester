const mysql = require('mysql');
const bcrypt = require('bcryptjs');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty123456",
  database: "tester"
});
class User {
  constructor(obj) {
    for(var key in obj) {
      this[key] = obj[key];
    }
  }
  register(cb) {
    this.hashPassword((err) => {
      if(err) return cb(err);
      var values = `"${this.name}","${this.pass}","${this.salt}", 0`;
      var props = `name, pass, salt, admin`;
      con.query(`INSERT INTO users(${props}) VALUE(${values})`, (err, result) => {
        if(err) throw err;
        this.generateTable(cb);
      });
    });
  }
  hashPassword(cb) {
    bcrypt.genSalt(12, (err, salt) => {
      if(err) return cb(err);
      this.salt = salt;
      bcrypt.hash(this.pass, salt, (err, hash) => {
        if(err) return cb(err);
        this.pass = hash;
        return cb();
      });
    });
  }
  static checkName(check, cb) {
    con.query('SELECT name FROM users', (err, names) => {
      if(err) return cb(err);
      for(var name of names) {
        if(name.name == check) return cb(null, true);
      }
      return cb(null, false);
    });
  }
  static getByName(name, cb) {
    this.checkName(name, (err, bool) => {
      if(err) return cb(err);
      if(bool) {
        con.query(`SELECT * FROM users WHERE name="${name}"`, (err, user) => {
          if(err) return cb(err);
          return cb(null, new User(user[0]));
        });
      } else {
        return cb();
      }
    });
  }
  static getById(id, cb) {
    con.query(`SELECT * FROM users WHERE id = ${id}`, (err, user) => {
      if(err) return cb(err);
      cb(err, new User(user[0]));
    });
  }
  static authenticate(name, pass, cb) {
    User.getByName(name, (err, user) => {
      if(err) return cb(err);
      if(!user) return cb();
      bcrypt.hash(pass, user.salt, (err, hash) => {
        if(err) return cb(err);
        if(hash == user.pass) return cb(null, user);
        return cb();
      });
    });
  }
  generateTable(cb) {
    con.query(`CREATE TABLE if not exists ${this.name}(id int not null, grade tinyint not null) CHARSET=utf8`, (err) => {
      if(err) return cb(err);
      return cb();
    });
  }
}
module.exports = User;