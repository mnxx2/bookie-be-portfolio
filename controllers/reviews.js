const models = require("../models");

// exports.createReview = async (req, res) => {
//   const isbnRaw = req.params.isbn;
//   const isbn = isbnRaw.replace(/-/g, "");
//   const { content, rating } = req.body;

//   const userId = 1;
//   try {
//     const review = await models.Review.create({
//       content,
//       rating,
//       isbn,
//       userId,
//     });

exports.createReview = async (req, res) => {
  const isbn = req.params.isbn;
  const { content, rating } = req.body;

  try {
    const book = await models.Book.findOne({
      where: { isbn },
    });

    if (!book) {
      console.log(book);
      console.log(isbn);
      return res.status(404).json({ message: "책을 찾을 수 없습니다." });
    }

    const userId = req.user.id;
    const review = await models.Review.create({
      content,
      rating,
      bookId: book.id,
      userId,
    });

    res.status(201).json({ message: "OK", data: review });
  } catch (error) {
    console.error("리뷰 작성 에러:", error);
    res
      .status(500)
      .json({ message: "리뷰 작성에 실패했습니다.", error: error.message });
  }
};

//     res.status(201).json({ message: "OK", data: review });
//   } catch (error) {
//     console.error("리뷰 작성 에러 : ", error);
//     res
//       .status(404)
//       .json({ message: "책을 찾지 못해 리뷰를 작성할 수 없습니다." });
//   }
// };

// 각 책별 리뷰 목록
exports.getReviewAll = async (req, res) => {
  const bookId = req.params.bookId;

  const book = await models.Book.findOne({ where: { id: bookId } });

  if (!book) {
    console.log(book);
    res.status(404).json({ message: "선택한 책이 없습니다." });
  }
  const reviews = await models.Review.findAll({ where: { bookId: book.id } });

  if (reviews.length === 0) {
    return res.status(404).json({ message: "아직 등록된 리뷰가 없습니다." });
  }

  res.status(200).json({ message: "OK", data: reviews });
};

// 리뷰 삭제
exports.deleteReview = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const bookId = req.params.bookId;

  const review = await models.Review.findByPk(id);

  if (!review) {
    return res.status(404).json({ message: "존재하지 않는 리뷰입니다." });
  }

  if (String(review.bookId) !== String(bookId)) {
    return res
      .status(404)
      .json({ message: "이 리뷰는 해당 책에 속하지 않습니다." });
  }

  if (review.userId !== userId) {
    return res
      .status(404)
      .json({ message: "이 리뷰를 삭제할 권한이 없습니다." });
  }

  // const review = await models.Review.findOne({
  //   where: {
  //     id,
  //     bookId,
  //     userId,
  //   },
  // });

  if (!review) {
    return res.status(404).json({ message: "리뷰를 찾지 못했습니다." });
  } else {
    await review.destroy();
    res.status(200).json({ message: "리뷰가 정상적으로 삭제되었습니다." });
  }
};

// 리뷰 수정 : 리뷰가 있는지, 속해있는 책이 맞는지, 작성한 사용자가 맞는지 확인
exports.updateReview = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const bookId = req.params.bookId;
  const { content, rating } = req.body;

  const review = await models.Review.findByPk(id);

  if (!review) {
    return res.status(404).json({ message: "존재하지 않는 리뷰입니다." });
  }

  if (String(review.bookId) !== String(bookId)) {
    return res
      .status(404)
      .json({ message: "이 리뷰는 해당 책에 속하지 않습니다." });
  }

  if (review.userId !== userId) {
    return res
      .status(404)
      .json({ message: "이 리뷰를 수정할 권한이 없습니다." });
  }

  // const review = await models.Review.findOne({
  //   where: {
  //     id,
  //     bookId,
  //     userId,
  //   },
  // });

  if (review) {
    if (content) review.content = content;
    if (rating) review.rating = rating;

    await review.save();
    res.status(200).json({ message: "OK", data: review });
  } else {
    res.status(404).json({ message: "리뷰 수정에 실패했습니다." });
  }
};
