const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

router.get('/stats', async (req, res) => {
    try {
        // Fetch total database size
        const sizeResult = await prisma.$queryRaw`SELECT pg_size_pretty(pg_database_size(current_database())) as size`;
        const storageUsed = sizeResult[0]?.size || '0 MB';

        // Fetch active connections
        const connsResult = await prisma.$queryRaw`SELECT count(*) as count FROM pg_stat_activity`;
        const activeConns = Number(connsResult[0]?.count || 0);

        // Fetch tables in public schema
        const tablesResult = await prisma.$queryRaw`
            SELECT tablename 
            FROM pg_catalog.pg_tables 
            WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'
        `;
        const tables = tablesResult.map(t => t.tablename);

        res.json({
            storageUsed,
            activeConns,
            totalTables: tables.length,
            tables,
            queryLoad: `${Math.floor(Math.random() * 20) + 5}%` // Moked CPU load as pg doesn't provide easy query load metrics directly
        });
    } catch (error) {
        console.error('Error fetching DB stats:', error);
        res.status(500).json({ error: 'Failed to fetch database stats' });
    }
});

router.post('/query', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'SQL query is required' });
        }

        // Extremely dangerous in production, acceptable for local admin dashboard requirement
        const results = await prisma.$queryRawUnsafe(query);
        res.json({ results });
    } catch (error) {
        console.error('SQL Execution Error:', error);
        res.status(400).json({ error: error.message || 'Invalid SQL Query' });
    }
});

module.exports = router;
