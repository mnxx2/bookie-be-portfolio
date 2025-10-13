const models = require("../models");

// 나의 책장만 조회
exports.getShelvesAll = async (req, res) => {
  const shelves = await models.BookShelf.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: models.Book,
        as: "bookshelfItems",
        attributes: ["title", "thumbnail"],
      },
    ],
  });
  res.status(200).json({ message: "OK", data: shelves });
};

exports.addBookToBookShelves = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    // bookshelves 테이블에 추가
    // userid, bookid로 중복 체크
    const bookshelf = await models.BookShelf.findOne({
      where: { userId: req.user.id, bookId: bookId },
    });

    if (bookshelf) {
      return res.status(404).json({ message: "이미 책장에 추가된 책입니다." });
    }

    await models.BookShelf.create({
      userId: req.user.id,
      bookId: bookId,
    });

    res
      .status(201)
      .json({ message: `${req.user.name}님, 책장에 책이 추가되었습니다.` });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "책장에 책을 추가하지 못했습니다." });
  }
};

exports.getBookOne = async (req, res) => {
  const id = req.params.id;

  const book = await models.BookShelf.findByPk(id, {
    include: [
      {
        model: models.Book,
        as: "bookshelfItems",
        attributes: ["title", "thumbnail", "authors"],
      },
    ],
  });

  if (!book) {
    res.status(404).json({ message: "선택한 책이 책장에 없습니다." });
  } else {
    res.status(200).json({ message: "OK", data: book });
  }
};

exports.updateBookReport = async (req, res) => {
  const id = req.params.id;
  const { shortReport, bookReport, status, rating } = req.body;

  const book = await models.BookShelf.findByPk(id, {
    include: [
      {
        model: models.Book,
        as: "bookshelfItems",
        attributes: ["title", "thumbnail", "authors"],
      },
    ],
  });

  if (book) {
    if (shortReport) book.shortReport = shortReport;
    if (bookReport) book.bookReport = bookReport;
    if (status) book.status = status;
    if (rating) book.rating = rating;

    await book.save();
    res.status(200).json({ message: "OK", data: book });
  } else {
    res.status(404).json({ message: "독후감 기록에 실패했습니다." });
  }
};

exports.deleteBookshelf = async (req, res) => {
  const id = req.params.id;

  const result = await models.BookShelf.findByPk(id);

  if (result) {
    res.status(200).json({ message: "독후감을 삭제했습니다." });
  } else {
    res.status(404).json({ message: "이미 책장에 존재하지 않는 책입니다." });
  }
};
