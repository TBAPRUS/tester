var User = require('../models/user');
exports.submit = (req, res, next) => {
  var data = req.body.user;
  User.authenticate(data.name, data.pass, (err, user) => {
    if(err) return next(err);
    if(user) {
      req.session.uid = user.id;
      let result = {
        user: true,
        admin: false,
        error: 0
      }
      if(user.admin) {
        result.admin = true;
      }
      res.json(result);
    } else {
      res.json({
        error: 2
      });
    }
  });
};
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if(err) return next(err);
    res.json({
      error: 0
    });
  });
};