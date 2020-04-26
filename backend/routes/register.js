var User = require('../models/user');
exports.submit = (req, res, next) => {
  var data = req.body.user;
  User.getByName(data.name, (err, user) => {
    if(err) return next(err);
    if(user) {
      res.json({
        error: 1
      });
    } else {
      user = new User({
        name: data.name,
        pass: data.pass
      });
      user.register((err) => {
        if(err) return next(err);
        User.getByName(user.name, (err, user) => {
          if(err) return next(err);
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
        })
      });
    }
  });
}