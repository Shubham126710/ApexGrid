const prisma = require("../prisma/client");

const getAllRaces = async () => {
    return await prisma.race.findMany({
        include: { circuit: true }
    });
};

const getRaceById = async (id) => {
    return await prisma.race.findUnique({
        where: { id: parseInt(id) },
        include: { circuit: true, shipments: true, expenses: true, hotels: true, flights: true }
    });
};

const createRace = async (data) => {
    return await prisma.race.create({
        data
    });
};

const updateRace = async (id, data) => {
    return await prisma.race.update({
        where: { id: parseInt(id) },
        data
    });
};

const deleteRace = async (id) => {
    return await prisma.race.delete({
        where: { id: parseInt(id) }
    });
};

module.exports = {
    getAllRaces,
    getRaceById,
    createRace,
    updateRace,
    deleteRace
};
