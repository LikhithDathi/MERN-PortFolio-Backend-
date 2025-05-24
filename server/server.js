require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

// ✅ TEMPORARY TEST ROUTE to insert a sample project
const Project = require('./models/Project');
app.get('/add-test-project', async (req, res) => {
  try {
    await Project.create({
      title: 'My Portfolio',
      description: 'A portfolio built with MERN stack',
      link: 'https://example.com',
      technologies: ['React', 'Node.js', 'MongoDB']
    });
    res.send('Test project added');
  } catch (err) {
    console.error('Error adding test project:', err);
    res.status(500).send('Failed to add test project');
  }
});

// Root route - API health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server using dynamic port from environment or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
