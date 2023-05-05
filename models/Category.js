const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      onDelete:"CASCADE"
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Category;
