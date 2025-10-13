const models = require("../models");
const bcrypt = require("bcryptjs");
const { generageAccessToken } = require("../utils/token");

// 회원가입 + 인증
exports.register = async (req, res) => {
  const { email, name, password } = req.body;

  const validateUser = await models.User.findOne({ where: { email } });

  if (validateUser) {
    return res.status(404).json({ message: "이미 사용 중인 이메일입니다." });
  }

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await models.User.create({
    email: email,
    name: name,
    password: hashedPassword,
  });

  res.status(201).json({ message: "OK", data: user });
};

// 로그인
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 이메일로 사용자가 있는지 확인
  const user = await models.User.findOne({ where: { email } });

  // 사용자가 없으면 잘못된 이메일, 비밀번호라고 메시지 전달
  if (!user) {
    res.status(404).json({ message: "이메일과 비밀번호가 일치하지 않습니다." });
  }

  // 사용자가 있으면 비밀번호 비교
  const isMatch = await bcrypt.compare(password, user.password);

  // 비밀번호가 일치하지 않으면 사용자에게 메시지 전달
  if (!isMatch) {
    return res.status(404).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  // 정당한 사용자(이메일과 비밀번호가 일치) 임시허가증(토큰) 발급
  const accessToken = generageAccessToken(user);
  res.json({ message: "OK", accessToken: accessToken, user });
};
