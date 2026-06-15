const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'apexgrid_super_secret_key_2026';

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, teamName } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Optional: find or create team if provided
    let teamId = null;
    if (teamName) {
      // Very basic logic for demo: try to find team, or create it if not found.
      // A robust app might require an invite code instead.
      const team = await prisma.team.findFirst({ where: { name: teamName } });
      if (team) {
        teamId = team.id;
      } else {
        const newTeam = await prisma.team.create({
          data: {
            name: teamName,
            nationality: 'Unknown',
            baseCity: 'Unknown'
          }
        });
        teamId = newTeam.id;
      }
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        teamId
      }
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, teamId: user.teamId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        teamId: user.teamId
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, teamId: user.teamId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        teamId: user.teamId
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;
