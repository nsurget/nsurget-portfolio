# Workspace Developer Rules - Portfolio / CV Website

These project-scoped rules apply to all code modifications and additions in this workspace.

## 1. Code Language & Comments
* **Comment Language**: All comments in the code MUST be written in English.
* **Text / Display Content**: User-facing copy (headings, paragraphs, resume details) must be in French as in the original `cv.md` and Stitch screens.

## 2. Backend Coding Standards (Express.js)
* **Architecture**: Clean MVC or REST API architecture.
* **Database**: SQLite database initialized through Sequelize ORM.
* **Models & Schema**:
  * `Project` (id, title, description, url, github_url, educationId)
  * `Education` (id, title, institution, year, degree_level)
  * `Tag` (id, name, slug)
* **Relations**:
  * Many-to-Many: `Project` <-> `Tag` (through `ProjectTags`)
  * Many-to-Many: `Education` <-> `Tag` (through `EducationTags`)
  * One-to-Many: `Education` -> `Project` (Project has an optional `educationId` pointing to `Education`)

## 3. Frontend Coding Standards (Vue 3 + Vite + Tailwind CSS)
* **Vue Features**: Modern Vue 3 with Composition API (`<script setup>`).
* **Styling**: Tailwind CSS classes matching the design system token specification.
* **Cross-Display Logic**:
  * On an Education page: display linked tags and projects generated during that education.
  * On a Project page: display its tags and a link to the linked education (if any).
* **Images**: 
  * Avoid raw image placeholders. Use existing portfolio resources or realistic generated assets.
  * Always append the `draggable="false"` attribute to page block images to prevent drag issues on desktop screens.

## 4. Source Data Integrity
* Use actual, real content from `cv/cv.md` (re-formatted or detailed as necessary) or user inputs.
* Do not invent fictional professional experience or credentials.
