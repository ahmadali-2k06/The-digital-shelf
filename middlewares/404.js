const error404 = (req, res) => {
  return res.status(404).send("<h1>Not Found</h1>");
};
module.exports = error404;
