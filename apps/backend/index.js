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
  const { title, description, location, date, organizationId, imageUrl } = req.body; // 👈 imageUrl de destructure ettik

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        location,
        date: new Date(date),
        organizationId: Number(organizationId),
        imageUrl: imageUrl || null, // 👈 imageUrl kaydediliyor!
      },
    });
    res.json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
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
  const { name, description, ownerId, bannerUrl, logoUrl, category } = req.body;
  try {
    const organization = await prisma.organization.create({
      data: {
        name,
        description,
        owner: { connect: { id: ownerId } },
        bannerUrl,
        logoUrl, // LOGO URL EKLENDİ 🚀
        category,
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

// GET /users/:id → user detay + memberOrganizations
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        memberOrganizations: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) }, // eğer id number ise
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});


app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.json(deletedEvent);
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});


app.get('/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        organization: true,
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

app.get('/organizations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const organization = await prisma.organization.findUnique({
      where: { id: parseInt(id) },
      include: {
        owner: true,
        members: { include: { user: true } },
        events: true,
      },
    });

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(organization);
  } catch (error) {
    console.error('Error fetching organization:', error);
    res.status(500).json({ error: 'Failed to fetch organization' });
  }
});

app.delete('/organizations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrganization = await prisma.organization.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedOrganization);
  } catch (error) {
    console.error('Error deleting organization:', error);
    res.status(500).json({ error: 'Failed to delete organization' });
  }
});
