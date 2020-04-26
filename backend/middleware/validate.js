exports.password = (req, res, next) => {
  var pass = req.body.user.pass;
  var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,24}$/;
  if(reg.test(pass)) {
    next();
  } else {
    res.redirect('back')
  }
};
exports.name = (req, res, next) => {
  var name = req.body.user.name;
  var reg = /^[a-zA-Z]{4,24}$/;
  if(reg.test(name)) {
    next();
  } else {
    res.redirect('back');
  }
};
exports.auth = (req, res, next) => {
  if(req.session.uid) {
    next();
  } else {
    res.redirect('/');
  }
}