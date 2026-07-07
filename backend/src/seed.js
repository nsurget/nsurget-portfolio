import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize, Tag, Project, Education } from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSeed() {
  // Sync the tables, forcing recreation
  await sequelize.sync({ force: true });
  console.log('Database schema synchronized. Parsing cv.md...');

  const cvPath = path.join(__dirname, '../../cv/cv.md');
  const cvContent = fs.readFileSync(cvPath, 'utf8');

  // Split file into main sections
  const sections = cvContent.split('\n## ');
  
  let educationSection = '';
  let projectsSection = '';
  
  for (const sec of sections) {
    if (sec.startsWith('EDUCATION')) {
      educationSection = sec;
    } else if (sec.startsWith('PROJECTS')) {
      projectsSection = sec;
    }
  }

  // 1. Parse Education blocks
  const eduBlocks = educationSection.split('\n### ');
  const educationsData = [];
  const eduTagsMap = new Map();
  const eduProjMap = new Map();
  
  for (const block of eduBlocks) {
    if (block.startsWith('EDUCATION')) continue;
    const lines = block.split('\n');
    const headerLine = lines[0];
    const match = headerLine.match(/\[ID:\s*([^\]]+)\]\s*(.+)/);
    if (!match) continue;
    
    const id = match[1].trim();
    const title = match[2].trim();
    
    let degree_level = '';
    let institution = '';
    let year = '';
    let tagsList = [];
    let linkedProjs = [];
    
    for (const line of lines.slice(1)) {
      const cleanLine = line.trim();
      if (cleanLine.startsWith('- **Niveau :**')) {
        degree_level = cleanLine.replace('- **Niveau :**', '').trim();
      } else if (cleanLine.startsWith('- **Organisme :**')) {
        const orgText = cleanLine.replace('- **Organisme :**', '').trim();
        const orgMatch = orgText.match(/(.+)\s*\(([^)]+)\)/);
        if (orgMatch) {
          institution = orgMatch[1].trim();
          year = orgMatch[2].trim();
        } else {
          institution = orgText;
          year = 'N/A';
        }
      } else if (cleanLine.startsWith('- **Tags associés :**')) {
        const tagsText = cleanLine.replace('- **Tags associés :**', '').trim();
        tagsList = tagsText.split(',').map(t => t.trim()).filter(Boolean);
      } else if (cleanLine.startsWith('- **Projets liés :**')) {
        const projText = cleanLine.replace('- **Projets liés :**', '').trim();
        linkedProjs = projText.split(',').map(p => p.trim()).filter(Boolean);
      } else if (cleanLine.startsWith('- **Durée / Certification :**')) {
        degree_level = cleanLine.replace('- **Durée / Certification :**', '').trim();
      }
    }
    
    educationsData.push({ id, title, institution, year, degree_level });
    if (tagsList.length > 0) eduTagsMap.set(id, tagsList);
    if (linkedProjs.length > 0) eduProjMap.set(id, linkedProjs);
  }

  // 2. Parse Project blocks
  const projBlocks = projectsSection.split('\n#### ');
  const projectsData = [];
  const projTagsMap = new Map();
  
  for (const block of projBlocks) {
    if (block.startsWith('PROJECTS')) continue;
    const lines = block.split('\n');
    const headerLine = lines[0];
    const match = headerLine.match(/\[ID:\s*([^\]]+)\]\s*(.+)/);
    if (!match) continue;
    
    const id = match[1].trim();
    const title = match[2].trim();
    
    let description = '';
    let url = '';
    let github_url = '';
    let tagsList = [];
    let linkedEdu = null;
    
    for (const line of lines.slice(1)) {
      const cleanLine = line.trim();
      if (cleanLine.startsWith('- **Description :**')) {
        description = cleanLine.replace('- **Description :**', '').trim();
      } else if (cleanLine.startsWith('- **Lien :**')) {
        const linkText = cleanLine.replace('- **Lien :**', '').trim();
        const linkMatch = linkText.match(/\[([^\]]+)\]\(([^)]+)\)/);
        url = linkMatch ? linkMatch[2] : linkText;
      } else if (cleanLine.startsWith('- **GitHub :**')) {
        const ghText = cleanLine.replace('- **GitHub :**', '').trim();
        const ghMatch = ghText.match(/\[([^\]]+)\]\(([^)]+)\)/);
        github_url = ghMatch ? ghMatch[2] : (ghText.startsWith('http') ? ghText : `https://github.com/${ghText}`);
      } else if (cleanLine.startsWith('- **Tags :**')) {
        const tagsText = cleanLine.replace('- **Tags :**', '').trim();
        tagsList = tagsText.split(',').map(t => t.trim()).filter(Boolean);
      } else if (cleanLine.startsWith('- **Lié à la formation :**')) {
        linkedEdu = cleanLine.replace('- **Lié à la formation :**', '').trim();
      }
    }
    
    projectsData.push({ id, title, description, url, github_url, educationId: linkedEdu });
    if (tagsList.length > 0) projTagsMap.set(id, tagsList);
  }

  // 3. Extract and construct unique Tags
  const allTagNames = new Set();
  eduTagsMap.forEach(tags => tags.forEach(t => allTagNames.add(t)));
  projTagsMap.forEach(tags => tags.forEach(t => allTagNames.add(t)));
  
  // Include standard fallback tag names requested in the prompt
  const defaultTags = ['HTML', 'JS', 'Vue', 'React', 'Bootstrap', 'SCSS', 'Java', 'Scrum Master', 'Spring Boot', 'PHP', 'WordPress', 'WooCommerce', 'Scrum', 'Agilité'];
  defaultTags.forEach(t => allTagNames.add(t));
  
  const createdTags = {};
  for (const name of allTagNames) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `TAG-${slug.toUpperCase()}`;
    const tag = await Tag.create({ id, name, slug });
    createdTags[name.toLowerCase()] = tag;
  }
  console.log(`Successfully created ${Object.keys(createdTags).length} Tag entities.`);

  // 4. Create Education entities and link tags
  const educationInstances = {};
  for (const edu of educationsData) {
    const instance = await Education.create(edu);
    educationInstances[edu.id] = instance;
    
    const tags = eduTagsMap.get(edu.id) || [];
    for (const tagName of tags) {
      const tagInstance = createdTags[tagName.toLowerCase()];
      if (tagInstance) {
        await instance.addTag(tagInstance);
      }
    }
  }
  console.log(`Successfully created ${educationsData.length} Education entities.`);

  // 5. Create Project entities and link tags/education
  for (const proj of projectsData) {
    const eduId = proj.educationId;
    if (eduId && !educationInstances[eduId]) {
      // Experience reference or invalid reference, skip direct database educationId link
      proj.educationId = null;
    }
    
    const instance = await Project.create(proj);
    
    const tags = projTagsMap.get(proj.id) || [];
    for (const tagName of tags) {
      const tagInstance = createdTags[tagName.toLowerCase()];
      if (tagInstance) {
        await instance.addTag(tagInstance);
      }
    }
  }
  console.log(`Successfully created ${projectsData.length} Project entities.`);
  
  // 6. Associate projects linked via education blocks
  for (const [eduId, projIds] of eduProjMap.entries()) {
    const eduInstance = educationInstances[eduId];
    if (eduInstance) {
      for (const projId of projIds) {
        const projInstance = await Project.findByPk(projId);
        if (projInstance) {
          projInstance.educationId = eduId;
          await projInstance.save();
        }
      }
    }
  }

  // 7. Inject specific JAVA & Scrum project for Human Booster POEC (EDU-HB-JAVA)
  const javaProjId = 'PROJ-JAVA-HB';
  let javaProj = await Project.findByPk(javaProjId);
  if (!javaProj) {
    javaProj = await Project.create({
      id: javaProjId,
      title: 'Projet JAVA & Scrum',
      description: 'Développement d’une application de gestion robuste en Java SE / Spring Boot dans le cadre de la formation intensive POEC. Gestion d’équipe sous le rôle de Scrum Master certifié PSM I, avec application des cérémonies agiles et sprints de livraison.',
      url: null,
      github_url: 'https://github.com/nsurget',
      educationId: 'EDU-HB-JAVA'
    });
    
    // Associate tags
    const tagsToAdd = ['Java', 'Spring Boot', 'Scrum', 'Agilité', 'Scrum Master'];
    for (const tName of tagsToAdd) {
      const tagInst = createdTags[tName.toLowerCase()];
      if (tagInst) {
        await javaProj.addTag(tagInst);
      }
    }
    console.log('Linked Java & Scrum Project to Human Booster POEC.');
  }

  console.log('Seeding process completed successfully!');
  process.exit(0);
}

runSeed().catch(err => {
  console.error('Database seeding failed:', err);
  process.exit(1);
});
