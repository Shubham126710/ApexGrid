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

const crypto = require('crypto');

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Return success even if user not found to prevent email enumeration
      return res.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    });

    // In a real app, send email here. For demo, we'll just return it or log it.
    console.log(`Password reset token for ${email}: ${resetToken}`);
    
    res.json({ message: 'If that email exists, a reset link has been sent.', debugToken: resetToken });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() } // Token must not be expired
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Hash new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

module.exports = router;
