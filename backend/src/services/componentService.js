const prisma = require("../prisma/client");

const getAllComponents = async (teamId) => prisma.component.findMany({ 
    where: teamId ? { teamId } : {}, 
    include: { team: true } 
});
const getComponentById = async (id) => prisma.component.findUnique({ where: { id: parseInt(id) }, include: { team: true } });
const createComponent = async (data) => prisma.component.create({ data });
const updateComponent = async (id, data) => prisma.component.update({ where: { id: parseInt(id) }, data });
const deleteComponent = async (id) => prisma.component.delete({ where: { id: parseInt(id) } });

module.exports = { getAllComponents, getComponentById, createComponent, updateComponent, deleteComponent };
