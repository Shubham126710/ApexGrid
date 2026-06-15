const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

router.get('/', async (req, res) => {
    try {
        if (!req.user || !req.user.teamId) {
            return res.status(400).json({ error: 'User does not belong to a team' });
        }
        
        let settings = await prisma.teamSettings.findUnique({
            where: { teamId: req.user.teamId }
        });
        
        if (!settings) {
            settings = await prisma.teamSettings.create({
                data: { teamId: req.user.teamId }
            });
        }
        
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/', async (req, res) => {
    try {
        if (!req.user || !req.user.teamId) {
            return res.status(400).json({ error: 'User does not belong to a team' });
        }
        
        const { autoReroute, criticalAlerts } = req.body;
        
        const settings = await prisma.teamSettings.upsert({
            where: { teamId: req.user.teamId },
            update: { autoReroute, criticalAlerts },
            create: { teamId: req.user.teamId, autoReroute, criticalAlerts }
        });
        
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
