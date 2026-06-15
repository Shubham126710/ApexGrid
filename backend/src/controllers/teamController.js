const teamService = require("../services/teamService");

const getAllTeams = async (req, res) => {
    try {
        const teams = await teamService.getAllTeams(req.user?.teamId);
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTeamById = async (req, res) => {
    try {
        const team = await teamService.getTeamById(req.params.id);
        if (!team) return res.status(404).json({ error: "Team not found" });
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTeam = async (req, res) => {
    try {
        const team = await teamService.createTeam(req.body);
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTeam = async (req, res) => {
    try {
        const team = await teamService.updateTeam(req.params.id, req.body);
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTeam = async (req, res) => {
    try {
        await teamService.deleteTeam(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
};
