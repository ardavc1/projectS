const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Kullanıcılar
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/users', async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const newUser = await prisma.user.create({ data: { email, name, password } });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Etkinlikler
app.get('/events', async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/events', async (req, res) => {
  const { title, description, location, date } = req.body;
  try {
    const newEvent = await prisma.event.create({
      data: { title, description, location, date: new Date(date) },
    });
    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Organizasyonlar
app.get('/organizations', async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: {
        members: { include: { user: true } },
        owner: true,
      },
    });
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch organizations' });
  }
});

app.post('/organizations', async (req, res) => {
  const { name, description, ownerId } = req.body;
  try {
    const organization = await prisma.organization.create({
      data: {
        name,
        description,
        owner: { connect: { id: ownerId } },
      },
    });
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create organization' });
  }
});

app.post('/organizations/:id/join', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const membership = await prisma.organizationMembership.create({
      data: {
        user: { connect: { id: userId } },
        organization: { connect: { id: parseInt(id) } },
      },
    });
    res.json(membership);
  } catch (error) {
    res.status(500).json({ error: 'Failed to join organization' });
  }
});

// Basit ana sayfa
app.get('/', (req, res) => {
  res.send('Sosyalizer Backend Çalışıyor 🚀');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
