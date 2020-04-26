const Test = require('../models/test')

exports.add = (req, res) => {
  let test = new Test(req.body.test);
  const { img, title, questions } = test;
  if(img) {
    if(title) {
      if(questions.length > 4) {
        if(questions.filter((question) => !question.title).length == 0) {
          if(questions.filter((question) => question.answers.length < 2).length == 0) {
            if(questions.filter((question) => question.answers.filter((answer) => answer.length < 1).length != 0).length == 0) {
              if(questions.filter((question) => question.correct == -1).length == 0) {
                test.addTest((err) => {
                  if(err) {
                    res.json({
                      error: 11
                    })
                  } else {
                    res.json({
                      error: 0
                    })
                  }
                });
              } else {
                res.json({ error: 10 })
              }
            } else {
              res.json({ error: 9 })
            }
          } else {
            res.json({ error: 8 })
          }
        } else {
          res.json({ error: 7 })
        }
      } else {
        res.json({ error: 6 })
      }
    } else {
      res.json({ error: 5 })
    }
  } else {
    res.json({ error: 4 })
  }
}

exports.gets = (req, res) => {
  Test.getTests(req.params.page, (err, tests) => {
    if(err) {
      res.json({ error: 11 })
    }
    let result = {};
    if(tests.length < 11) {
      result.last = true
    }
    result.error = 0;
    result.tests = tests.slice(0, 10);
    res.json(result);
  });
}

exports.get = (req, res) => {
  Test.getTest(req.params.id, (err, test) => {
    if(err) {
      res.json({ error: 11 })
    }
    res.json({
      error: 0,
      test
    });
  });
}

exports.testanswer = (req, res) => {
  Test.testAnswer(req.body.answers, (err, result) => {
    if(err) {
      res.json({ error: 11 })
    }
    res.json({
      error: 0,
      result
    });
  });
}