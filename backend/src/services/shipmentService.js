const prisma = require("../prisma/client");

const getAllShipments = async (teamId) => {
    return await prisma.shipment.findMany({
        where: teamId ? { teamId } : {},
        include: { team: true, race: true }
    });
};

const getShipmentById = async (id) => {
    return await prisma.shipment.findUnique({
        where: { id: parseInt(id) },
        include: { team: true, race: true }
    });
};

const createShipment = async (data) => {
    return await prisma.shipment.create({
        data
    });
};

const updateShipment = async (id, data) => {
    return await prisma.shipment.update({
        where: { id: parseInt(id) },
        data
    });
};

const deleteShipment = async (id) => {
    return await prisma.shipment.delete({
        where: { id: parseInt(id) }
    });
};

module.exports = {
    getAllShipments,
    getShipmentById,
    createShipment,
    updateShipment,
    deleteShipment
};
