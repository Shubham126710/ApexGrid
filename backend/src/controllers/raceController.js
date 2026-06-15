const raceService = require("../services/raceService");

const getAllRaces = async (req, res) => {
    try {
        const races = await raceService.getAllRaces();
        res.json(races);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRaceById = async (req, res) => {
    try {
        const race = await raceService.getRaceById(req.params.id);
        if (!race) return res.status(404).json({ error: "Race not found" });
        res.json(race);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createRace = async (req, res) => {
    try {
        const race = await raceService.createRace(req.body);
        res.status(201).json(race);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRace = async (req, res) => {
    try {
        const race = await raceService.updateRace(req.params.id, req.body);
        res.json(race);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRace = async (req, res) => {
    try {
        await raceService.deleteRace(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllRaces,
    getRaceById,
    createRace,
    updateRace,
    deleteRace
};
