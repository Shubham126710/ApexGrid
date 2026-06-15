const prisma = require("../prisma/client");

const getAllExpenses = async (teamId) => {
    return await prisma.expense.findMany({
        where: teamId ? { teamId } : {},
        include: { team: true, race: true, component: true }
    });
};

const getExpenseById = async (id) => {
    return await prisma.expense.findUnique({
        where: { id: parseInt(id) },
        include: { team: true, race: true, component: true }
    });
};

const createExpense = async (data) => {
    return await prisma.expense.create({
        data
    });
};

const updateExpense = async (id, data) => {
    return await prisma.expense.update({
        where: { id: parseInt(id) },
        data
    });
};

const deleteExpense = async (id) => {
    return await prisma.expense.delete({
        where: { id: parseInt(id) }
    });
};

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};
