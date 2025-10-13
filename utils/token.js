const jwt = require("jsonwebtoken");

// 사용자가 로그인하면 토큰 발급
const generageAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    "access_token",
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  generageAccessToken,
};
