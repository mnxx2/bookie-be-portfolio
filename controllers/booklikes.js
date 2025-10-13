const models = require("../models");

exports.createBooklike = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;

  try {
    const [like, created] = await models.BookLike.findOrCreate({
      where: { userId, bookId },
    });

    // 좋아요 -> 좋아요 삭제
    if (!created) {
      await like.destroy();
      return res.status(200).json({ message: "OK", liked: false });
    } else {
      // 좋아요 생성
      return res.status(200).json({ message: "OK", liked: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "좋아요를 할 수 없습니다." });
  }
};
