module.exports = (sequelize, DataTypes) => {
  const BookShelf = sequelize.define(
    "BookShelf",
    {
      status: {
        type: DataTypes.ENUM("completed", "reading", "wantToRead"),
        defaultValue: "completed",
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      shortReport: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bookReport: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { tableName: "bookshelves" }
  );

  BookShelf.associate = function (models) {
    BookShelf.belongsTo(models.User, {
      foreignKey: "userId",
      as: "bookshelf",
    });

    BookShelf.belongsTo(models.Book, {
      foreignKey: "bookId",
      as: "bookshelfItems",
    });
  };

  return BookShelf;
};
