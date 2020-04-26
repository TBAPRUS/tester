var mysql = require('mysql');

var connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty123456",
  database: 'tester'
});

const update = `UPDATE users SET admin=1 WHERE id=1;`
const select = 'SELECT * FROM users';
const describe = 'DESCRIBE users';
const createDataBASE = 'CREATE DATABASE tester'
const drop = 'DROP TABLE users';
const users = 'CREATE TABLE if not exists users(id int primary key auto_increment, name varchar(26) not null, pass varchar(250) not null, salt varchar(250) not null, admin tinyint(1) not null) CHARSET=utf8';
const tests = 'CREATE TABLE if not exists tests(id int primary key auto_increment, title varchar(200) not null, img MEDIUMTEXT, questions TEXT not null) CHARSET=utf8';
const questions = 'CREATE TABLE if not exists questions(id int primary key auto_increment, title varchar(200) not null, img MEDIUMTEXT, correct tinyint not null, answers TEXT not null) CHARSET=utf8';
const answers = 'CREATE TABLE if not exists answers(id int primary key auto_increment, answer varchar(200) not null) CHARSET=utf8';


connect.query('SELECT * FROM answers', (err, result) => {
  console.log(result)
  connect.query('SELECT * FROM questions', (err, result) => {
    console.log(result)
  });
});
/*
connect.query(tests, (err, result) => {
  if(err) throw err
  connect.query(questions, (err, result) => {
    if(err) throw err
    connect.query(answers, (err, result) => {
      if(err) throw err
      connect.end()
    })
  })
})
*/
/*
connect.query(createDataBASE, (err) => {
  var connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty123456",
    database: 'tester'
  });
  connect.query(command, (err) => {
    console.log('SUCCES')
  });
});
*/
/*
connect.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  connect.query(select, function (err, result) {
    console.log(result)
  });
});
*/