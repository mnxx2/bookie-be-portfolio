// 토큰이 유효한지 검증하는 미들웨어
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token;

  // 헤더에 들어가는 Bearer 토큰 에서 토큰만 가져오기
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "인증되지 않은 사용자입니다." });
  }

  // 토큰 검증
  jwt.verify(token, "access_token", (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "인증되지 않은 사용자입니다. 재로그인 해주세요." });
    }

    req.user = user;
    next();
  });
};

module.exports = {
  authenticate,
};
