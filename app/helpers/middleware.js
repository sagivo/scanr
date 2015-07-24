module.exports = function alert(obj) {
  return function(req, res, next) {
    res.flash = req.flash;
    next();
  }
}