const { registerSchema } = require("../utils/validation");

exports.validateRegister = (req, res, next) => {
  // registerSchema를 이용해서 입력 데이터 검증
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(404).json({ message: error });
  }

  next();
};
