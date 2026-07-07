<script setup>
import { ref, onMounted, computed } from 'vue';

const projects = ref([]);
const tags = ref([]);
const selectedTagId = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const [projRes, tagsRes] = await Promise.all([
      fetch('/api/projects'),
      fetch('/api/tags')
    ]);
    projects.value = await projRes.json();
    tags.value = await tagsRes.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    isLoading.value = false;
  }
});

// Dynamic layout spans for Bento styling
const getGridSpan = (index) => {
  // Pattern: 8-columns span, then 4-columns, then 6, then 6...
  const pattern = ['md:col-span-8', 'md:col-span-4', 'md:col-span-6', 'md:col-span-6'];
  return pattern[index % pattern.length];
};

// Return project placeholder cover image
const getProjectImage = (id) => {
  const images = {
    'PROJ-ASHIKA': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'PROJ-COLIBRI': 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80',
    'PROJ-KASA': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    'PROJ-ABRICOT': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    'PROJ-SPORTSEE': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'PROJ-TOMTROC': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'PROJ-JAVA-HB': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  };
  return images[id] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
};

// Filtered projects
const filteredProjects = computed(() => {
  if (!selectedTagId.value) return projects.value;
  return projects.value.filter(proj => 
    proj.Tags.some(tag => tag.id === selectedTagId.value)
  );
});

const selectTag = (tagId) => {
  selectedTagId.value = selectedTagId.value === tagId ? null : tagId;
};
</script>

<template>
  <div class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-stack-lg py-stack-lg flex flex-col gap-stack-lg pt-28">
    <!-- Header -->
    <header class="flex flex-col gap-4">
      <h1 class="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        Mes Réalisations
      </h1>
      <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
        Une sélection de projets e-commerce, d'applications web interactives et de travaux académiques issus de mes expériences chez Coqpit et de mes formations.
      </p>
    </header>

    <!-- Tag Filter Bar -->
    <div class="flex flex-wrap gap-2 py-2">
      <button 
        @click="selectedTagId = null"
        class="font-code-sm text-code-sm px-4 py-1.5 rounded-full border transition-all duration-300 active:scale-95"
        :class="!selectedTagId ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container/40 border-white/10 text-on-surface-variant hover:text-primary'"
      >
        Tous
      </button>
      <button 
        v-for="tag in tags" 
        :key="tag.id"
        @click="selectTag(tag.id)"
        class="font-code-sm text-code-sm px-4 py-1.5 rounded-full border transition-all duration-300 active:scale-95 flex items-center gap-2"
        :class="selectedTagId === tag.id ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container/40 border-white/10 text-on-surface-variant hover:text-primary'"
      >
        {{ tag.name }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <span class="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></span>
    </div>

    <!-- Projects Bento Grid Gallery -->
    <section v-else class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      <router-link 
        v-for="(proj, index) in filteredProjects" 
        :key="proj.id"
        :to="'/projets/' + proj.id"
        class="glass-card rounded-xl overflow-hidden flex flex-col group glow-hover transition-all duration-500 cursor-pointer"
        :class="getGridSpan(index)"
      >
        <!-- Card Layout for Larger Spans -->
        <div class="flex flex-col h-full" :class="getGridSpan(index).includes('col-span-8') ? 'md:flex-row' : ''">
          <!-- Image -->
          <div 
            class="relative overflow-hidden h-56 min-h-[14rem]" 
            :class="getGridSpan(index).includes('col-span-8') ? 'md:w-1/2 md:h-full' : ''"
          >
            <img 
              :alt="proj.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              draggable="false"
              :src="getProjectImage(proj.id)"
            />
          </div>

          <!-- Info content -->
          <div 
            class="p-stack-md flex flex-col justify-between flex-grow gap-4"
            :class="getGridSpan(index).includes('col-span-8') ? 'md:w-1/2' : ''"
          >
            <div>
              <h2 class="font-headline-md text-headline-md text-2xl mb-2 text-white">{{ proj.title }}</h2>
              <p class="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                {{ proj.description }}
              </p>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span 
                v-for="tag in proj.Tags.slice(0, 4)" 
                :key="tag.id"
                class="font-code-sm text-code-sm bg-secondary/15 text-secondary px-3 py-1 rounded-full border border-secondary/10"
              >
                {{ tag.name }}
              </span>
            </div>

            <!-- Action Link -->
            <div class="flex justify-between items-center mt-4">
              <div 
                class="flex items-center gap-2 text-primary group-hover:text-primary-fixed transition-colors font-label-caps text-label-caps uppercase tracking-widest text-xs"
              >
                Détails du projet
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
      
      <!-- Empty state -->
      <div v-if="filteredProjects.length === 0" class="col-span-12 py-20 text-center glass-card rounded-xl">
        <p class="font-body-lg text-body-lg text-on-surface-variant">Aucun projet ne correspond aux filtres sélectionnés.</p>
      </div>
    </section>
  </div>
</template>
