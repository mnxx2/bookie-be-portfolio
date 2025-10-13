module.exports = (sequelize, DataTypes) => {
  const BookMark = sequelize.define(
    "BookMark",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "bookmarks",
    }
  );

  BookMark.associate = function (models) {
    BookMark.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userbookmarks",
    });

    BookMark.belongsTo(models.Book, {
      foreignKey: "bookId",
      as: "bookmarks",
    });
  };

  return BookMark;
};
