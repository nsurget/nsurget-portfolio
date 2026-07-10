<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const project = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch(`/api/projects/${route.params.id}`);
    if (!res.ok) {
      router.push('/projets');
      return;
    }
    project.value = await res.json();
  } catch (error) {
    console.error('Failed to load project details:', error);
    router.push('/projets');
  } finally {
    isLoading.value = false;
  }
});

const getProjectImage = (id) => {
  const images = {
    'PROJ-GEN-PLUGIN': 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80',
    'PROJ-GEN-LEGAL': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80',
    'PROJ-ERP-CONNECT': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    'PROJ-ASHIKA': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'PROJ-COLIBRI': 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=1200&q=80',
    'PROJ-HOKALO': 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
    'PROJ-GLOBALU': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    'PROJ-MASTER-GLOQUAL': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    'PROJ-AUREP': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    'PROJ-KASA': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    'PROJ-ABRICOT': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'PROJ-SPORTSEE': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    'PROJ-TOMTROC': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    'PROJ-NSURGET-FR': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    'PROJ-JAVA-HB': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'
  };
  return images[id] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
};

const goBack = () => {
  router.push('/projets');
};
</script>

<template>
  <div class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-stack-lg py-stack-lg pt-28">
    <div v-if="isLoading" class="flex justify-center items-center h-96">
      <span class="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></span>
    </div>

    <div v-else-if="project" class="flex flex-col gap-8">
      <!-- Back Button -->
      <div>
        <button @click="goBack" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps text-sm">
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          Retour aux réalisations
        </button>
      </div>

      <!-- Hero Banner -->
      <div class="h-96 rounded-2xl overflow-hidden relative border border-white/10">
        <img 
          :src="getProjectImage(project.id)" 
          :alt="project.title" 
          class="w-full h-full object-cover opacity-60"
          draggable="false"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        <div class="absolute bottom-6 left-6 md:left-12">
          <span class="font-code-sm text-code-sm bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
            {{ project.id }}
          </span>
          <h1 class="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
            {{ project.title }}
          </h1>
        </div>
      </div>

      <!-- Details Content Split -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
        <!-- Main Description (8 Cols) -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          <div class="glass-card rounded-xl p-4 sm:p-6 md:p-8 flex flex-col gap-4">
            <h2 class="font-headline-md text-headline-md text-xl text-white">Présentation du Projet</h2>
            <p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-line">
              {{ project.description }}
            </p>
          </div>

          <!-- Code Window Visual Accent -->
          <div class="code-window rounded-xl p-4 sm:p-6 overflow-hidden">
            <div class="flex gap-2 mb-4">
              <div class="w-3 h-3 rounded-full bg-error/70"></div>
              <div class="w-3 h-3 rounded-full bg-[#f59e0b]/70"></div>
              <div class="w-3 h-3 rounded-full bg-primary/70"></div>
            </div>
            <pre class="font-code-sm text-code-sm text-secondary overflow-x-auto"><code>// Code structure details
export default {
  id: "{{ project.id }}",
  name: "{{ project.title }}",
  technologies: [
    {{ project.Tags.map(t => `"${t.name}"`).join(',\n    ') }}
  ]
}</code></pre>
          </div>
        </div>

        <!-- Sidebar Details (4 Cols) -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <div class="glass-card rounded-xl p-4 sm:p-6 flex flex-col gap-6">
            <h3 class="font-headline-md text-headline-md text-lg text-white">Fiche technique</h3>
            
            <!-- Tags -->
            <div>
              <span class="font-label-caps text-label-caps text-xs text-on-surface-variant block mb-2">Technologies</span>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in project.Tags" 
                  :key="tag.id"
                  class="font-code-sm text-code-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full border border-secondary/25"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>

            <hr class="border-white/5"/>

            <!-- Associated Links -->
            <div v-if="project.url || project.github_url" class="flex flex-col gap-3">
              <span class="font-label-caps text-label-caps text-xs text-on-surface-variant block">Liens</span>
              
              <a 
                v-if="project.url" 
                :href="project.url" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="bg-primary text-on-primary font-body-md text-body-md py-3 rounded-lg text-center font-medium hover:shadow-[0_0_15px_rgba(105,220,164,0.3)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-[18px]">language</span>
                Visiter le site
              </a>

              <a 
                v-if="project.github_url" 
                :href="project.github_url" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="bg-surface-container/30 border border-white/10 hover:bg-surface-container/50 font-body-md text-body-md py-3 rounded-lg text-center font-medium active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-[18px]">code</span>
                Code Source (GitHub)
              </a>
            </div>

            <!-- Associated Formation (Cross-Display) -->
            <div v-if="project.education" class="flex flex-col gap-2 pt-2 border-t border-white/5">
              <span class="font-label-caps text-label-caps text-xs text-on-surface-variant block">Formation associée</span>
              <router-link 
                :to="'/formations/' + project.education.id"
                class="group flex flex-col p-4 bg-surface-container/40 hover:bg-primary/10 border border-white/5 hover:border-primary/30 rounded-xl transition-all duration-300 text-left"
              >
                <span class="font-body-md text-body-md font-semibold text-white group-hover:text-primary transition-colors">
                  {{ project.education.title }}
                </span>
                <span class="font-code-sm text-code-sm text-on-surface-variant mt-1">
                  {{ project.education.institution }} ({{ project.education.year }})
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
