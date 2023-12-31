const Project = require('../models/Project');
const Project = require('../models/Project');
const { authenticateJWT, checkAdminRole } = require('../middleware/auth');


// Get all projects with only necessary fields
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({}, '_id title description screenshotUrls').exec();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch projects' });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  const { title, description, screenshotUrls } = req.body;

  try {
    const project = await Project.create({
      title,
      description,
      screenshotUrls,
      // Other project fields...
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create project' });
  }
};



// Get all projects with only necessary fields
exports.getAllProjects = [authenticateJWT, async (req, res) => {
  try {
    const projects = await Project.find({}, '_id title description screenshotUrls').exec();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch projects' });
  }
}];

// Delete a project by ID (authenticated and with admin role)
exports.deleteProjectById = [authenticateJWT, checkAdminRole, async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findByIdAndRemove(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete project' });
  }
}];
