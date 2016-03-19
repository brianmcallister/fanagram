const auth = (options) => (req, res, next) => {
  const token = req.session.token;
  const msg = !!token
    ? 'user is logged in: ' + token
    : 'user is logged out';

  console.log('home route', msg);
  next();
}

module.exports = auth;
