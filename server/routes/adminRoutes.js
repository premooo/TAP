const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const multer = require('multer');
const path = require('path');
const Career = require('../models/Career');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage }); // Move this above routes using 'upload'

// Route to get all projects
router.get("/admin/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 }); 
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

router.get('/admin/project/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project', error: err.message });
  }
});

// Route to get the latest 2 projects
router.get("/admin/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 }).limit(2); 
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// Route to delete a project by ID
router.delete('/admin/project/:id', async (req, res) => {
  console.log('Received DELETE request for project with ID:', req.params.id);
  try {
    const projectId = req.params.id;
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      console.log('Project not found');
      return res.status(404).json({ message: 'Project not found' });
    }

    console.log('Project deleted successfully');
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error in delete request:', error);
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

// Route to get all career listings
router.get("/admin/career/list", async (req, res) => {
  try {
    const careers = await Career.find().sort({ _id: -1 });
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching careers" });
  }
});

// Route to fetch a project by ID for editing
router.get("/admin/project/edit/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project", error: err });
  }
});

// Route to update a project by ID
router.put("/admin/project/:id", upload.single('image'), async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, description } = req.body;
    const image = req.file ? req.file.path : null;

    const updatedProject = await Project.findByIdAndUpdate(projectId, {
      title,
      description,
      image: image || undefined
    }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: "Error updating project", error: err });
  }
});

// Route to create a new project
router.post('/admin/project', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProject = new Project({
      title,
      description,
      image,
    });

    await newProject.save();
    return res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error uploading project' });
  }
});

// Route to create a new career post
router.post('/admin/career', async (req, res) => {
  try {
    const { title, description, location, type, salary, closingDate, responsibilities, qualifications, benefits, company, contactEmail } = req.body;

    const newCareer = new Career({
      title,
      description,
      location,
      type,
      salary,
      closingDate,
      responsibilities: responsibilities ? responsibilities.split(',') : [],
      qualifications: qualifications ? qualifications.split(',') : [],
      benefits: benefits ? benefits.split(',') : [],
      company,
      contactEmail,
    });

    await newCareer.save();
    return res.status(201).json(newCareer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error uploading career post' });
  }
});



// Route to get the count of all projects
router.get('/api/admin/project/count', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    res.json({ count: projectCount });
  } catch (err) {
    console.error("Error fetching project count:", err); // Log the full error
    res.status(500).json({ message: 'Error fetching project count', error: err.message });
  }
});

// Route to get the count of all careers
router.get('/admin/career/count', async (req, res) => {
  try {
    const careerCount = await Career.countDocuments(); // Replace with your career model
    res.json({ count: careerCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching career count' });
  }
});

module.exports = router;
