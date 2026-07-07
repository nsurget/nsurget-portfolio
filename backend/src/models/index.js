import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Define Tag model
export const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Define Project model
export const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  github_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Define Education model
export const Education = sequelize.define('Education', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING, // e.g. "2024", "2022 - 2023"
    allowNull: false,
  },
  degree_level: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Many-to-Many: Project <-> Tag
Project.belongsToMany(Tag, { through: 'ProjectTags', foreignKey: 'projectId', otherKey: 'tagId' });
Tag.belongsToMany(Project, { through: 'ProjectTags', foreignKey: 'tagId', otherKey: 'projectId' });

// Many-to-Many: Education <-> Tag
Education.belongsToMany(Tag, { through: 'EducationTags', foreignKey: 'educationId', otherKey: 'tagId' });
Tag.belongsToMany(Education, { through: 'EducationTags', foreignKey: 'tagId', otherKey: 'educationId' });

// One-to-Many: Education -> Project
Education.hasMany(Project, { foreignKey: 'educationId', as: 'projects' });
Project.belongsTo(Education, { foreignKey: 'educationId', as: 'education' });

export { sequelize };
