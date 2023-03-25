import Sequelize from 'sequelize';

const sequelize = new Sequelize('nimap', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});



class Category extends Sequelize.Model {}

Category.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'category',
  timestamps: true,
  tableName: 'categories'
});



class Product extends Sequelize.Model { }
Product.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'product',
    timestamps: false,
    tableName: 'products'
});

Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });


export { Category, Product };

