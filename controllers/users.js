const models = require("../models");
const bcrypt = require("bcryptjs");

// // 회원가입
// exports.createUser = async (req, res) => {
//   const { email, password, name } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const validateUser = await models.User.findOne({ where: { email } });

//     if (validateUser) {
//       return res.status(404).json({ message: "이미 가입된 이메일입니다." });
//     }

//     const user = await models.User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ message: "OK", data: user });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "회원가입에 실패했습니다.", error: error.message });
//   }
// };

// 회원정보 수정
exports.updateuser = async (req, res) => {
  const id = req.params.id;
  const { password, newPassword, name, email } = req.body;
  const user = await models.User.findByPk(id);

  if (password === user.password) {
    if (user) {
      if (password) user.password = newPassword;
      if (name) user.name = name;

      await user.save();
      res.status(200).json({ message: "OK", data: user });
    } else {
      res.status(404).json({ message: "사용자 정보를 찾을 수 없습니다." });
    }
  } else {
    res.status(404).json({ message: "비밀번호가 일치하지 않습니다." });
  }
};

// 회원탈퇴
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const password = req.body.password;

  const user = await models.User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }

  if (password === user.password) {
    const result = await models.User.destroy({ where: { id } });

    if (result > 0) {
      res.status(200).json({ message: "회원 탈퇴가 완료되었습니다." });
    } else {
      res.status(404).json({ message: "회원 탈퇴에 실패했습니다." });
    }
  }
};

// 회원 정보 찾기
exports.findUserByEmail = async (req, res) => {
  const email = req.params.email;
  const user = await models.User.findOne({ where: { email } });

  res.status(200).json({ message: "OK", data: user });
};
