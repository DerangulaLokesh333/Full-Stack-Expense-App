const Expense = require("../models/Expense");

// Create expense
const createExpense = async (req, res) => {
    try {
        const { description, amount } = req.body;

        const expense = await Expense.create({
            description,
            amount
        });

        res.status(201).json(expense);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create expense",
            error: error.message
        });
    }
};

// Get all expenses
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();

        res.json(expenses);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch expenses",
            error: error.message
        });
    }
};

// Delete expense
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        await expense.destroy();

        res.json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete expense",
            error: error.message
        });
    }
};

// Update expense
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, amount } = req.body;

        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        expense.description = description;
        expense.amount = amount;

        await expense.save();

        res.json({
            message: "Expense updated successfully",
            expense
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update expense",
            error: error.message
        });
    }
};

module.exports = {
    createExpense,
    getExpenses,
    deleteExpense,
    updateExpense
};