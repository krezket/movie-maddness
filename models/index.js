//replace the modes/index.js file with this file

// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category);
// Categories have many Products
Category.hasMany(Product)



// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  // as: 'product_tags',
  foreignKey: 'product_id',
  onDelete:"CASCADE"
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  // as: 'product_tags',
  foreignKey: 'tag_id',
  onDelete:"CASCADE"
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
