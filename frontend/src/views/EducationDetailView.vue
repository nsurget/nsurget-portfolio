<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const education = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch(`/api/education/${route.params.id}`);
    if (!res.ok) {
      router.push('/competences');
      return;
    }
    education.value = await res.json();
  } catch (error) {
    console.error('Failed to load education details:', error);
    router.push('/competences');
  } finally {
    isLoading.value = false;
  }
});

const getProjectImage = (id) => {
  const images = {
    'PROJ-GEN-PLUGIN': 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80',
    'PROJ-GEN-LEGAL': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    'PROJ-ERP-CONNECT': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    'PROJ-ASHIKA': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'PROJ-COLIBRI': 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80',
    'PROJ-HOKALO': 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
    'PROJ-GLOBALU': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    'PROJ-MASTER-GLOQUAL': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    'PROJ-AUREP': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    'PROJ-KASA': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    'PROJ-ABRICOT': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    'PROJ-SPORTSEE': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'PROJ-TOMTROC': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'PROJ-NSURGET-FR': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    'PROJ-JAVA-HB': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  };
  return images[id] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
};

const goBack = () => {
  router.push('/competences');
};
</script>

<template>
  <div class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-stack-lg py-stack-lg pt-28">
    <div v-if="isLoading" class="flex justify-center items-center h-96">
      <span class="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></span>
    </div>

    <div v-else-if="education" class="flex flex-col gap-8 animate-fade-in">
      <!-- Back Link -->
      <div>
        <button @click="goBack" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps text-sm">
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          Retour aux compétences
        </button>
      </div>

      <!-- Header Box -->
      <div class="glass-card rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden">

        <span class="font-label-caps text-label-caps text-primary tracking-widest uppercase">
          {{ education.year }}
        </span>
        <h1 class="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
          {{ education.title }}
        </h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant mt-2">
          {{ education.institution }} <span v-if="education.degree_level">• {{ education.degree_level }}</span>
        </p>

        <!-- Associated Tags -->
        <div class="mt-6 flex flex-wrap gap-2">
          <span 
            v-for="tag in education.Tags" 
            :key="tag.id"
            class="font-code-sm text-code-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/20"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>

      <!-- Projects Section -->
      <div class="flex flex-col gap-6">
        <h2 class="font-headline-md text-headline-md text-2xl text-white flex items-center gap-3">
          <span class="material-symbols-outlined text-primary">terminal</span>
          Projets réalisés durant cette formation
        </h2>

        <div v-if="education.projects && education.projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <router-link 
            v-for="proj in education.projects" 
            :key="proj.id"
            :to="'/projets/' + proj.id"
            class="glass-card rounded-xl overflow-hidden flex flex-col group glow-hover transition-all duration-500 cursor-pointer"
          >
            <div class="h-48 overflow-hidden relative">
              <img 
                :src="getProjectImage(proj.id)" 
                :alt="proj.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                draggable="false"
              />
            </div>
            <div class="p-6 flex flex-col justify-between flex-grow gap-4">
              <div>
                <h3 class="font-headline-md text-xl text-white group-hover:text-primary transition-colors">
                  {{ proj.title }}
                </h3>
                <p class="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-3">
                  {{ proj.description }}
                </p>
              </div>

              <!-- Tags in Project -->
              <div v-if="proj.Tags && proj.Tags.length > 0" class="flex flex-wrap gap-1.5 mt-auto">
                <span 
                  v-for="t in proj.Tags" 
                  :key="t.id"
                  class="text-xs font-code-sm text-secondary bg-secondary/5 px-2.5 py-0.5 rounded border border-secondary/10"
                >
                  {{ t.name }}
                </span>
              </div>

              <div class="mt-2 pt-2 border-t border-white/5 flex justify-end">
                <div 
                  class="inline-flex items-center gap-1.5 text-xs font-label-caps text-primary group-hover:text-primary-fixed transition-colors uppercase tracking-wider"
                >
                  Fiche Projet
                  <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div v-else class="py-16 text-center glass-card rounded-xl border border-dashed border-white/10">
          <span class="material-symbols-outlined text-4xl text-on-surface-variant mb-2">work_off</span>
          <p class="font-body-lg text-body-lg text-on-surface-variant">Aucun projet répertorié pour cette formation.</p>
        </div>
      </div>
    </div>
  </div>
</template>
