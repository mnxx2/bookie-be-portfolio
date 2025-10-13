require("dotenv").config();
const cors = require("cors");
const express = require("express");
const models = require("./models");
const path = require("path");
const { Sequelize } = require("sequelize");
const app = express();
const PORT = process.env.PORT || 3000;
const booksRouter = require("./routes/books");
const shelvesRouter = require("./routes/bookshelves");
const reviewsRouter = require("./routes/reviews");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const booklikesRouter = require("./routes/booklikes");

// JSON 파서 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS 수동 헤더 설정 (조건부)
// 모든 요청에 Access~Origin을 붙이면 express가 일부 요청을 이상하게 처리
// 특히 파비콘이나 정적 요청 등에서 req.headers.origin이 없을 수도 있기 때문
app.use((req, res, next) => {
  const allowedOrigin = "https://mnxx2.github.io";
  if (req.headers.origin === allowedOrigin) {
    res.header("Access-Control-Allow-Origin", allowedOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
});

// CORS 설정
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://mnxx2.github.io",
    credentials: true,
  })
);

// SQLite 설정
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "bookie.db"),
});

app.use("/books", booksRouter);
app.use("/bookshelves", shelvesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/booklikes", booklikesRouter);

app.listen(PORT, () => {
  console.log(`Bookie 서버가 http://localhost:${PORT}에서 실행중 입니다.`);

  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Bookie DB Connection");
    })
    .catch((error) => {
      console.log("Bookie DB Error", error);
      process.exit();
    });
});
