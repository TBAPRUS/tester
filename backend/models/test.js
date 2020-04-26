const mysql = require('mysql');
const bcrypt = require('bcryptjs');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty123456",
  database: "tester"
});
class Test {
  constructor(obj) {
    for(var key in obj) {
      this[key] = obj[key];
    }
  }

  addTest(cb) {
    this.addQuestions([], (err, questionsId) => {
      if(err) return cb(err)
      const questions = questionsId.join(' ');
      const { title, img } = this;
      con.query(`INSERT INTO tests(title, img, questions) VALUE("${title}", "${img}","${questions}")`, (err, result) => {
        if(err) return cb(err)
        return cb(null)
      });
    })
  }

  addQuestions(ids, cb) {
    if(ids.length != this.questions.length) {
      this.addQuestion(this.questions[ids.length], (err, id) => {
        if(err) return cb(err);
        return this.addQuestions([...ids, id], cb);
      });
    } else {
      return cb(null, ids);
    }
  }

  addQuestion(question, cb) {
    this.addAnswers(question, [], (err, answersId) => {
      if(err) return cb(err)
      const answers = answersId.join(' ');
      const { title, img, correct } = question;
      con.query(`INSERT INTO questions(title, img, correct, answers) VALUE("${title}", "${img}", ${correct},"${answers}")`, (err, result) => {
        if(err) return cb(err)
        return cb(null, result.insertId)
      });
    });
  }

  addAnswers(question, ids, cb) {
    if(ids.length != question.answers.length) {
      this.addAnswer(question.answers[ids.length], (err, id) => {
        if(err) return cb(err);
        return this.addAnswers(question, [...ids, id], cb);
      });
    } else {
      return cb(null, ids);
    }
  }

  addAnswer(answer, cb) {
    con.query(`INSERT INTO answers(answer) VALUE("${answer}")`, (err, result) => {
      if(err) return cb(err)
      return cb(null, result.insertId)
    });
  }

  static getTests(page, cb) {
    con.query(`SELECT id, title, img FROM tests`, (err, result) => {
      if(err) return cb(err);
      cb(null, result.slice(page*10, page*10 + 11));
    });
  }

  static getTest(id, cb) {
    let res;
    con.query(`SELECT * FROM tests WHERE id=${id}`, (err, result) => {
      if(err) return cb(err);
      result = result[0];
      res = {
        id: result.id,
        title: result.title,
        img: result.img
      };
      let questionsId = result.questions.split(' ').join(' OR id=');
      con.query(`SELECT * FROM questions WHERE id=${questionsId}`, (err, result) => {
        if(err) return cb(err);
        res.questions = [...result.map((question) => ({...question, correct: undefined}))];
        let answersId = [].concat(...result.map((question) => question.answers.split(' '))).join(' OR id=');
        con.query(`SELECT * FROM answers WHERE id=${answersId}`, (err, result) => {
          if(err) return cb(err);
          res.questions = res.questions.map((question) => {
            let len = question.answers.split(' ').length;
            let answers = result.slice(0, len);
            result.splice(0, len);
            return {...question, answers}
          });
          return cb(null, res);
        });
      });
    });
  }

  static testAnswer(answers, cb) {
    let questionsId = answers.map((answer) => answer.id).join(' OR id=');
    con.query(`SELECT correct FROM questions WHERE id=${questionsId}`, (err, result) => {
      if(err) return cb(err);
      cb(null, answers.map((answer, index) => ({...answer, correct: result[index].correct})));
    });
  }
}
module.exports = Test;