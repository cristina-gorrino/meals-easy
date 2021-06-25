const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipe_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipe_instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        number_servings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.DECIMAL(12,2),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
    }
);

module.exports = Recipe;