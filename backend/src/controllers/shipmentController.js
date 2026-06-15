const shipmentService = require("../services/shipmentService");

const getAllShipments = async (req, res) => {
    try {
        const shipments = await shipmentService.getAllShipments(req.user?.teamId);
        res.json(shipments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getShipmentById = async (req, res) => {
    try {
        const shipment = await shipmentService.getShipmentById(req.params.id);
        if (shipment) res.json(shipment);
        else res.status(404).json({ error: "Shipment not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createShipment = async (req, res) => {
    try {
        const shipment = await shipmentService.createShipment(req.body);
        res.status(201).json(shipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateShipment = async (req, res) => {
    try {
        const shipment = await shipmentService.updateShipment(req.params.id, req.body);
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteShipment = async (req, res) => {
    try {
        await shipmentService.deleteShipment(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllShipments,
    getShipmentById,
    createShipment,
    updateShipment,
    deleteShipment
};
