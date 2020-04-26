exports.test = (req, res) => {
  let response = {
    user: false,
    admin: false,
    error: 0
  }
  if(req.user) {
    response.user = true;
    if(req.user.admin) {
      response.admin = true;
    }
  }
  res.json(response);
};