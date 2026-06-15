const expenseService = require("../services/expenseService");

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.getAllExpenses(req.user?.teamId);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getExpenseById = async (req, res) => {
    try {
        const expense = await expenseService.getExpenseById(req.params.id);
        if (expense) res.json(expense);
        else res.status(404).json({ error: "Expense not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createExpense = async (req, res) => {
    try {
        const expense = await expenseService.createExpense(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateExpense = async (req, res) => {
    try {
        const expense = await expenseService.updateExpense(req.params.id, req.body);
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try {
        await expenseService.deleteExpense(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};
