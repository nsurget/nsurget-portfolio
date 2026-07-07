import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import ProjectDetailView from '../views/ProjectDetailView.vue';
import EducationView from '../views/EducationView.vue';
import EducationDetailView from '../views/EducationDetailView.vue';
import HobbiesView from '../views/HobbiesView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/projets',
    name: 'Projects',
    component: ProjectsView,
  },
  {
    path: '/projets/:id',
    name: 'ProjectDetail',
    component: ProjectDetailView,
  },
  {
    path: '/competences',
    name: 'Education',
    component: EducationView,
  },
  {
    path: '/formations/:id',
    name: 'EducationDetail',
    component: EducationDetailView,
  },
  {
    path: '/loisirs',
    name: 'Hobbies',
    component: HobbiesView,
  },
  // Fallback redirect
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
