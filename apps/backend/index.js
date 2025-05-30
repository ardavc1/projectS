const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Basit endpoint → tüm kullanıcıları getirir
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// POST /users → yeni kullanıcı ekle
app.post('/users', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password
      },
    });
    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET /events → tüm eventleri getir
app.get('/events', async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST /events → yeni event ekle
app.post('/events', async (req, res) => {
  const { title, description, location, date } = req.body;

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        location,
        date: new Date(date) // tarih string ise Date objesine çeviriyoruz
      },
    });
    res.json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
