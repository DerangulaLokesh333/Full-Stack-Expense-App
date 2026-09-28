const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Expense = sequelize.define("Expense", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Expense;