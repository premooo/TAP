const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure the 'uploads' folder exists in the root directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: You can add a file size limit if needed
}).single('image');

const uploadProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : null;  // If an image is uploaded, store the file path

    const newProject = new Project({
      title,
      description,
      image,  // Save the image path to the project
    });

    await newProject.save();
    res.status(201).json({ message: 'Project uploaded successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload project', error: err });
  }
};


  const uploadCareer = async (req, res) => {
    try {
      const { 
        title, 
        description, 
        location, 
        type, 
        salary, 
        closingDate, 
        responsibilities, 
        qualifications, 
        benefits, 
        company, 
        contactEmail 
      } = req.body;
  
      const newCareer = new Career({
        title,
        description,
        location,
        type,
        salary,
        closingDate,
        responsibilities,
        qualifications,
        benefits,
        company,
        contactEmail,
      });
  
      await newCareer.save();
  
      res.status(201).json({ message: "Job post created successfully", career: newCareer });
    } catch (error) {
      res.status(500).json({ message: "Failed to create job post", error: error.message });
    }
  };
  
  const uploadBlog = async (req, res) => {
    try {
      const { title, content } = req.body;
      const image = req.file ? req.file.path : null;
      const newBlog = new Blog({ title, content, image });
      await newBlog.save();
      res.status(201).json({ message: 'Blog uploaded successfully!' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to upload blog', error: err });
    }
  };
  
  
  // Admin routes for uploading projects and blogs
  router.post("/project", verifyToken, isAdmin, (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.error(err); // Log the error from Multer
        return res.status(500).json({ message: 'File upload failed', error: err.message });
      }
      // Proceed with the normal project upload if file upload is successful
      uploadProject(req, res);
    });
  });
  router.post("/blog", verifyToken, isAdmin, upload.single('image'), uploadBlog);

  // DELETE route for deleting a project
router.delete('/project/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project', error: err });
  }
});


const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, description } = req.body;
    const image = req.file ? req.file.path : null;

    const updatedFields = { title, description };
    if (image) updatedFields.image = image;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updatedFields },
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update project', error: err });
  }
};

// Route for Updating Projects
router.put('/admin/project/:id', verifyToken, isAdmin, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }
    updateProject(req, res);
  });
});

module.exports = { uploadProject, uploadBlog, uploadCareer, updateProject };