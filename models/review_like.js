module.exports = (sequelize, DataTypes) => {
  const ReviewLike = sequelize.define(
    "ReviewLike",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      talbeName: "review_likes",
    }
  );

  ReviewLike.associate = function (models) {
    ReviewLike.belongsTo(models.User, {
      foreignKey: "userId",
      as: "userreviewlikes",
    });

    ReviewLike.belongsTo(models.Review, {
      foreignKey: "reviewId",
      as: "review",
    });
  };

  return ReviewLike;
};
