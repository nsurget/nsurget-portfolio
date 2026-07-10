import express from 'express';
import {
  getProjects,
  getProjectById,
  getEducation,
  getEducationById,
  getTags,
  getHobbies,
} from '../controllers/apiControllers.js';

const router = express.Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.get('/education', getEducation);
router.get('/education/:id', getEducationById);
router.get('/tags', getTags);
router.get('/hobbies', getHobbies);

export default router;
