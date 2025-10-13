module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "reviews",
    }
  );

  Review.associate = function (models) {
    Review.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userreviews",
    });

    Review.belongsTo(models.Book, {
      foreignKey: "bookId",
      as: "bookreviews",
    });

    Review.hasMany(models.ReviewLike, {
      foreignKey: "reviewId",
      as: "review",
    });
  };

  return Review;
};
