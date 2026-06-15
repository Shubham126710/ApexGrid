const prisma = require("../prisma/client");

const getAllTeams = async (teamId) => {
    return await prisma.team.findMany({
        where: teamId ? { id: teamId } : {},
        include: { drivers: true, staff: true }
    });
};

const getTeamById = async (id) => {
    return await prisma.team.findUnique({
        where: { id: parseInt(id) },
        include: { drivers: true, staff: true, components: true }
    });
};

const createTeam = async (data) => {
    return await prisma.team.create({
        data
    });
};

const updateTeam = async (id, data) => {
    return await prisma.team.update({
        where: { id: parseInt(id) },
        data
    });
};

const deleteTeam = async (id) => {
    return await prisma.team.delete({
        where: { id: parseInt(id) }
    });
};

module.exports = {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
};
