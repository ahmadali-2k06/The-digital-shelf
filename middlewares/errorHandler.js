const { CustomErrorApi } = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorApi) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).send("Error"+err.message);
};
module.exports=errorHandler;