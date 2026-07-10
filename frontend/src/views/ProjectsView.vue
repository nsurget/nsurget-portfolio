<script setup>
import { ref, onMounted, computed } from 'vue';
import PageHeader from '../components/PageHeader.vue';

const projects = ref([]);
const tags = ref([]);
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
    'PROJ-GEN-PLUGIN': 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
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

const selectedCategory = ref(null);
const selectedTechTagId = ref(null);

const featuredOrder = [
  'PROJ-HOKALO',
  'PROJ-GLOBALU',
  'PROJ-NSURGET-FR',
  'PROJ-ABRICOT',
  'PROJ-AUREP',
  'PROJ-MASTER-GLOQUAL'
];

const categoryTagNames = ['pro', 'formation', 'perso'];

const categoryTags = computed(() => {
  return tags.value.filter(tag => 
    categoryTagNames.includes(tag.name.toLowerCase()) && 
    tag.Projects && tag.Projects.length > 0
  );
});

const technologyTags = computed(() => {
  const list = tags.value.filter(tag => 
    !categoryTagNames.includes(tag.name.toLowerCase()) && 
    tag.Projects && tag.Projects.length > 0
  );

  const pinned = ['javascript', 'react', 'php', 'vue.js', 'woocommerce'];

  return [...list].sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const aIdx = pinned.indexOf(aName);
    const bIdx = pinned.indexOf(bName);

    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;

    return aName.localeCompare(bName);
  });
});

const showAllTechTags = ref(false);

const displayedTechnologyTags = computed(() => {
  if (showAllTechTags.value) {
    return technologyTags.value;
  }
  // Show only first 5 tags, but always keep the active selected tag visible
  const firstFive = technologyTags.value.slice(0, 5);
  if (selectedTechTagId.value) {
    const isSelectedInFirstFive = firstFive.some(t => t.id === selectedTechTagId.value);
    if (!isSelectedInFirstFive) {
      const selectedTag = technologyTags.value.find(t => t.id === selectedTechTagId.value);
      if (selectedTag) {
        firstFive.push(selectedTag);
      }
    }
  }
  return firstFive;
});

// Filtered projects by category AND technology
const filteredProjects = computed(() => {
  let result = projects.value;
  
  if (selectedCategory.value) {
    result = result.filter(proj => 
      proj.Tags.some(tag => tag.id === selectedCategory.value)
    );
  }
  
  if (selectedTechTagId.value) {
    result = result.filter(proj => 
      proj.Tags.some(tag => tag.id === selectedTechTagId.value)
    );
  }
  
  return [...result].sort((a, b) => {
    const aIdx = featuredOrder.indexOf(a.id);
    const bIdx = featuredOrder.indexOf(b.id);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return 0;
  });
});
</script>

<template>
  <div class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-stack-lg pt-32 pb-stack-lg flex flex-col gap-stack-lg relative">
    <!-- Header -->
    <PageHeader 
      title="Mes <strong>Réalisations</strong>" 
      description="Une sélection de projets e-commerce, d'applications web interactives et de travaux académiques issus de mes expériences chez Coqpit et de mes formations." 
    />

    <!-- Filters Panel -->
    <div class="flex flex-col gap-6 p-6 rounded-2xl bg-surface-container/20 border border-white/5">
      <!-- Categories Filter Bar -->
      <div class="flex flex-col gap-3">
        <span class="font-label-caps text-label-caps text-on-surface-variant uppercase text-xs tracking-widest flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px] text-primary">folder_open</span>
          Catégorie de projet
        </span>
        <div class="flex flex-wrap gap-2">
          <button 
            @click="selectedCategory = null"
            class="font-code-sm text-code-sm px-4 py-1.5 rounded-full border transition-all duration-300 active:scale-95"
            :class="!selectedCategory ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container/40 border-white/10 text-on-surface-variant hover:text-primary'"
          >
            Tous
          </button>
          <button 
            v-for="tag in categoryTags" 
            :key="tag.id"
            @click="selectedCategory = selectedCategory === tag.id ? null : tag.id"
            class="font-code-sm text-code-sm px-4 py-1.5 rounded-full border transition-all duration-300 active:scale-95"
            :class="selectedCategory === tag.id ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container/40 border-white/10 text-on-surface-variant hover:text-primary'"
          >
            {{ tag.name }}
          </button>
        </div>
      </div>

      <!-- Technology Filter Bar -->
      <div class="flex flex-col gap-3 pt-4 border-t border-white/5">
        <span class="font-label-caps text-label-caps text-on-surface-variant uppercase text-xs tracking-widest flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px] text-secondary">terminal</span>
          Technologies
        </span>
        <div class="flex flex-wrap gap-2">
          <button 
            @click="selectedTechTagId = null"
            class="font-code-sm text-code-sm px-4 py-1.5 rounded-full border transition-all duration-300 active:scale-95"
            :class="!selectedTechTagId ? 'bg-secondary text-on-secondary border-secondary' : 'bg-surface-container/40 border-white/10 text-on-surface-variant hover:text-secondary'"
          >
            Toutes
          </button>
          <button 
            v-for="tag in displayedTechnologyTags" 
            :key="tag.id"
            @click="selectedTechTagId = selectedTechTagId === tag.id ? null : tag.id"
            class="font-code-sm text-code-sm px-4 py-1.5 rounded-full border transition-all duration-300 active:scale-95"
            :class="selectedTechTagId === tag.id ? 'bg-secondary text-on-secondary border-secondary' : 'bg-surface-container/40 border-white/10 text-on-surface-variant hover:text-secondary'"
          >
            {{ tag.name }}
          </button>
          
          <button 
            v-if="technologyTags.length > 5"
            @click="showAllTechTags = !showAllTechTags"
            class="font-code-sm text-code-sm px-4 py-1.5 rounded-full border border-dashed border-secondary/30 bg-transparent text-secondary hover:text-white hover:bg-secondary/20 hover:border-secondary transition-all duration-300 active:scale-95 flex items-center gap-1"
          >
            <span>{{ showAllTechTags ? 'Voir moins' : 'Voir plus' }}</span>
            <span class="material-symbols-outlined text-[16px] transition-transform duration-300" :class="showAllTechTags ? 'rotate-180' : ''">
              keyboard_arrow_down
            </span>
          </button>
        </div>
      </div>
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
            <!-- Coup de cœur Badge -->
            <div 
              v-if="featuredOrder.includes(proj.id)"
              class="absolute top-3 left-3 bg-[#0b1326]/80 backdrop-blur border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10"
            >
              <span class="material-symbols-outlined text-[12px] text-[#ff5c5c]" style="font-variation-settings: 'FILL' 1;">favorite</span>
              <span class="font-code-sm text-[9px] text-on-surface-variant uppercase tracking-wider">Coup de cœur</span>
            </div>
          </div>

          <!-- Info content -->
          <div 
            class="p-4 md:p-stack-md flex flex-col justify-between flex-grow gap-4"
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
