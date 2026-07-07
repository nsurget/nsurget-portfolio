import { Project, Education, Tag } from '../models/index.js';

// Retrieve all projects with their tags and associated education
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: Tag,
          through: { attributes: [] }, // Exclude join table metadata from JSON output
        },
        {
          model: Education,
          as: 'education',
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single project by ID with its tags and associated education
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Tag,
          through: { attributes: [] },
        },
        {
          model: Education,
          as: 'education',
        },
      ],
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all educations with their tags and associated projects
export const getEducation = async (req, res) => {
  try {
    const educations = await Education.findAll({
      include: [
        {
          model: Tag,
          through: { attributes: [] },
        },
        {
          model: Project,
          as: 'projects',
          include: [
            {
              model: Tag,
              through: { attributes: [] },
            }
          ]
        },
      ],
      order: [['year', 'DESC']],
    });
    res.json(educations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single education by ID with its tags and projects
export const getEducationById = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id, {
      include: [
        {
          model: Tag,
          through: { attributes: [] },
        },
        {
          model: Project,
          as: 'projects',
          include: [
            {
              model: Tag,
              through: { attributes: [] },
            }
          ]
        },
      ],
    });
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Project,
          through: { attributes: [] },
        },
      ],
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
