<script setup>
import { ref, onMounted } from 'vue';
import PageHeader from '../components/PageHeader.vue';

const educations = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch('/api/education');
    educations.value = await res.json();
  } catch (error) {
    console.error('Failed to load education list:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-stack-lg pt-32 pb-stack-lg z-10 relative">
    <!-- Header -->
    <PageHeader 
      title="Mon <strong>Parcours</strong>" 
      description="Mon parcours académique, mes certifications technologiques et ma boîte à outils technique pour concevoir des applications web de pointe." 
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
      <!-- Timeline Column (Mes Formations) (5 cols) -->
      <section class="lg:col-span-5 flex flex-col space-y-stack-md">
        <h2 class="font-headline-md text-headline-md flex items-center gap-3 text-white">
          <span class="material-symbols-outlined text-primary">school</span>
          Mes Formations
        </h2>

        <div v-if="isLoading" class="flex justify-center items-center py-20">
          <span class="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></span>
        </div>

        <div v-else class="relative pl-6 border-l border-white/10 space-y-8 mt-6">
          <div 
            v-for="edu in educations" 
            :key="edu.id"
            class="relative group"
          >
            <!-- Timeline Node Indicator -->
            <div 
              class="absolute -left-[31px] top-1 w-4 h-4 rounded-full ring-4 ring-background z-10 transition-all duration-300"
              :class="edu.id === 'EDU-OC-FS' ? 'bg-primary shadow-[0_0_15px_rgba(105,220,164,0.6)]' : 'bg-surface-variant group-hover:bg-primary'"
            ></div>
            
            <router-link 
              :to="'/formations/' + edu.id"
              class="block bg-surface-container/30 border p-5 rounded-xl transition-all duration-300 group-hover:bg-surface-container-low/80 cursor-pointer"
              :class="edu.id === 'EDU-OC-FS' ? 'border-primary/30 shadow-[0_0_20px_rgba(105,220,164,0.05)]' : 'border-transparent hover:border-white/5'"
            >
              <div class="font-label-caps text-label-caps text-primary mb-1.5 tracking-widest">
                {{ edu.year }}
              </div>
              <h3 class="font-body-lg text-body-lg font-semibold text-white group-hover:text-primary transition-colors">
                {{ edu.title }}
              </h3>
              <div class="font-code-sm text-code-sm text-on-surface-variant mt-1.5 flex flex-wrap gap-2 items-center">
                <span>{{ edu.institution }}</span>
                <span v-if="edu.degree_level" class="text-xs px-2 py-0.5 rounded bg-white/5 text-white/70">{{ edu.degree_level }}</span>
              </div>
              
              <!-- Cross-Display Tags -->
              <div v-if="edu.Tags && edu.Tags.length > 0" class="flex flex-wrap gap-1.5 mt-3">
                <span 
                  v-for="tag in edu.Tags.slice(0, 4)" 
                  :key="tag.id"
                  class="text-[10px] font-code-sm text-secondary bg-secondary/5 px-2 py-0.5 rounded border border-secondary/10"
                >
                  {{ tag.name }}
                </span>
              </div>

              <!-- Details Link -->
              <div class="mt-4">
                <div 
                  class="inline-flex items-center gap-1 text-xs font-label-caps text-primary group-hover:text-primary-fixed transition-colors"
                >
                  {{ edu.projects && edu.projects.length > 0 ? 'Détails & Projets liés' : 'Détails' }}
                  <span class="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Skills Bento Grid (Mes Compétences) (7 cols) -->
      <section class="lg:col-span-7 flex flex-col space-y-stack-md">
        <h2 class="font-headline-md text-headline-md flex items-center gap-3 text-white">
          <span class="material-symbols-outlined text-secondary">terminal</span>
          Mes Compétences
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-6">
          <!-- Hard Skills Panel -->
          <div class="md:col-span-2 bg-surface-container border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
            <div class="flex items-center gap-2 mb-6">
              <span class="material-symbols-outlined text-primary">memory</span>
              <h3 class="font-body-lg text-body-lg font-semibold text-white">Compétences Techniques</h3>
            </div>
            
             <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="bg-surface-container-low border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-tertiary/20 transition-all duration-300 cursor-default">
                <span class="material-symbols-outlined text-3xl text-tertiary">storefront</span>
                <span class="font-code-sm text-code-sm text-white text-center">E-commerce</span>
              </div>
              <div class="bg-surface-container-low border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-secondary/20 transition-all duration-300 cursor-default">
                <span class="material-symbols-outlined text-3xl text-secondary">data_object</span>
                <span class="font-code-sm text-code-sm text-white">React</span>
              </div>
              <div class="bg-surface-container-low border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-yellow-400/20 transition-all duration-300 cursor-default">
                <span class="material-symbols-outlined text-3xl text-yellow-400">javascript</span>
                <span class="font-code-sm text-code-sm text-white">JavaScript</span>
              </div>
              <div class="bg-surface-container-low border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-primary/20 transition-all duration-300 cursor-default">
                <span class="material-symbols-outlined text-3xl text-primary">view_in_ar</span>
                <span class="font-code-sm text-code-sm text-white">Vue.js</span>
              </div>
            </div>
            
            <div class="mt-6 flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">TypeScript</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">PHP</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">WordPress</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">WooCommerce</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">Tailwind CSS</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">Next.js</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">Node.js</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">Java</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">Spring Boot</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">ERP/CRM</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">SQLite</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">REST APIs</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">Git</span>
              <span class="px-3 py-1 bg-primary/10 text-primary font-code-sm text-code-sm rounded-full border border-primary/20">Figma</span>
            </div>
          </div>

          <!-- Soft Skills Panel -->
          <div class="md:col-span-2 bg-surface-container-low/50 border border-white/5 rounded-2xl p-8 hover:bg-surface-container-low transition-colors duration-300">
            <div class="flex items-center gap-2 mb-6">
              <span class="material-symbols-outlined text-secondary">psychology</span>
              <h3 class="font-body-lg text-body-lg font-semibold text-white">Savoir-être &amp; Méthodologie</h3>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary-fixed-dim text-xl mt-0.5">check_circle</span>
                <div>
                  <h4 class="font-body-md text-body-md text-white font-medium">Résolution de problèmes</h4>
                  <p class="font-code-sm text-code-sm text-on-surface-variant mt-1">Approche analytique et rigoureuse face aux blocages.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary-fixed-dim text-xl mt-0.5">check_circle</span>
                <div>
                  <h4 class="font-body-md text-body-md text-white font-medium">Méthodologie Agile (Scrum)</h4>
                  <p class="font-code-sm text-code-sm text-on-surface-variant mt-1">Certifié Scrum Master PSM I, à l'aise avec la livraison itérative.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary-fixed-dim text-xl mt-0.5">check_circle</span>
                <div>
                  <h4 class="font-body-md text-body-md text-white font-medium">Esprit d'équipe & Collaboration</h4>
                  <p class="font-code-sm text-code-sm text-on-surface-variant mt-1">Travailler en synergie avec des designers et chefs de projets.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary-fixed-dim text-xl mt-0.5">check_circle</span>
                <div>
                  <h4 class="font-body-md text-body-md text-white font-medium">Adaptabilité</h4>
                  <p class="font-code-sm text-code-sm text-on-surface-variant mt-1">Apprentissage et montée en compétences rapides sur de nouvelles technologies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
