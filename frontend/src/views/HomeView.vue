<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const featuredProjects = ref([]);
const isLoading = ref(true);

const navigateToProjects = () => {
  router.push('/projets');
};

const navigateToEducation = () => {
  router.push('/competences');
};

const scrollToAbout = () => {
  const aboutSec = document.getElementById('about-section');
  if (aboutSec) {
    aboutSec.scrollIntoView({ behavior: 'smooth' });
  }
};

const featuredOrder = [
  'PROJ-HOKALO',
  'PROJ-GLOBALU',
  'PROJ-ABRICOT',
  'PROJ-AUREP',
  'PROJ-MASTER-GLOQUAL'
];

onMounted(async () => {
  try {
    const res = await fetch('/api/projects');
    const allProjects = await res.json();
    
    // Filter and sort the featured ones
    featuredProjects.value = allProjects
      .filter(p => featuredOrder.includes(p.id))
      .sort((a, b) => featuredOrder.indexOf(a.id) - featuredOrder.indexOf(b.id));
  } catch (error) {
    console.error('Failed to load featured projects:', error);
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
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"></div>
      <div class="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-stack-lg text-center flex flex-col items-center gap-stack-md">
        <!-- Personal Info Section -->
        <div class="flex flex-col items-center gap-2 mb-2">
          <span class="font-label-caps text-label-caps text-primary tracking-widest uppercase">Portfolio Personnel</span>
          <h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Nicolas Surget</h2>
        </div>
        
        <h1 class="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg max-w-4xl text-on-surface drop-shadow-2xl">
          Développeur Web <br class="hidden md:block"/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Spécialisé Front-end <br>& E-commerce</span>
        </h1>
        
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4 leading-relaxed">
          Développeur chez <span class="text-primary font-medium">Coqpit</span>, je poursuis actuellement une formation fullstack<br class="hidden sm:block" /> (en alternance) pour monter en compétences sur les technologies modernes <span class="text-secondary font-medium">Front-end</span> (React, Next.js ou Vue.js).<br class="hidden sm:block" /> Curieux et rigoureux, je mets l'accent sur l'expérience utilisateur pour concevoir des sites et des applications web fluides, optimisés et adaptés.
        </p>
        
        <div class="mt-stack-md flex flex-col sm:flex-row gap-gutter">
          <button @click="navigateToProjects" class="bg-primary text-on-primary font-body-md text-body-md font-medium px-8 py-4 rounded-lg hover:shadow-[0_0_20px_rgba(105,220,164,0.3)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2">
            Voir mes projets
            <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
          <button @click="navigateToEducation" class="bg-surface-container/60 border border-white/10 text-on-surface font-body-md text-body-md font-medium px-8 py-4 rounded-lg hover:bg-surface-container/80 transition-all duration-300 active:scale-95">
            Mon parcours
          </button>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div 
        @click="scrollToAbout" 
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer animate-bounce text-on-surface-variant/50 hover:text-primary transition-colors duration-300 z-20"
      >
        <span class="font-code-sm text-[9px] uppercase tracking-widest">Découvrir</span>
        <span class="material-symbols-outlined text-[20px]">keyboard_double_arrow_down</span>
      </div>
    </section>

    <!-- About Section (Asymmetric Bento/Glassmorphism) -->
    <section id="about-section" class="py-16 md:py-24 max-w-container-max mx-auto px-margin-mobile md:px-stack-lg relative scroll-mt-24">
      
      <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <!-- Left Content (7 cols) -->
        <div class="md:col-span-7 flex flex-col gap-stack-md relative z-10">
          <h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">terminal</span>
            À propos de moi
          </h2>
          
          <div class="glass-card p-stack-lg rounded-xl shadow-lg relative overflow-hidden group">
            <!-- Top glow edge -->
            <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <p class="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
              Développeur web au sein de l'agence <strong class="text-on-surface">Coqpit</strong> à Clermont-Ferrand, j'interviens sur la conception et l'optimisation d'applications web complexes et de plateformes e-commerce sur-mesure (WooCommerce, API REST). Mon quotidien s'articule autour de l'interconnexion de bases de données (synchronisations ERP Divalto, CRM Dendreo) et de l'automatisation via des scripts internes en JS pour optimiser les processus de l'équipe.
            </p>
            <p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Issu d'une double compétence technique (formation d'école d'ingénieur en mécanique à <strong class="text-on-surface">SIGMA</strong> et diplômes en développement logiciel), j'associe la rigueur d'ingénierie et l'agilité (certification Scrum Master PSM I) pour concevoir des solutions performantes. Passionné par l'écosystème <strong class="text-secondary">Front-end</strong> (Vue.js, React, Next.js), je m'attache à délivrer des interfaces interactives soignées, des rendus 3D fluides (Google model-viewer) et respectueux des normes d'accessibilité (RGAA).
            </p>
          </div>
        </div>

        <!-- Right Visual (5 cols) -->
        <div class="md:col-span-5 relative z-10 mt-stack-md md:mt-0">
          <div class="aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-surface-container relative">
            <img 
              class="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
              alt="Un espace de travail stylisé et minimaliste."
              draggable="false"
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
            />
            
            <!-- Floating Code Snippet Card -->
            <div class="absolute -bottom-6 -left-6 bg-[#0b1326] border border-white/10 p-4 rounded-lg shadow-xl hidden md:block">
              <div class="flex gap-1.5 mb-3">
                <div class="w-2.5 h-2.5 rounded-full bg-error"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-primary"></div>
              </div>
              <pre class="font-code-sm text-code-sm text-on-surface-variant"><code><span class="text-primary">const</span> <span class="text-secondary">transition</span> = {
  <span class="text-tertiary">de</span>: <span class="text-[#a6e22e]">'e-commerce'</span>,
  <span class="text-tertiary">vers</span>: <span class="text-[#a6e22e]">'front-end engineering'</span>,
  <span class="text-tertiary">passion</span>: <span class="text-primary">true</span>
};</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section (Coups de cœur) -->
    <section class="py-16 md:py-24 border-t border-white/5 max-w-container-max mx-auto px-margin-mobile md:px-stack-lg relative z-10">
      <div class="flex flex-col gap-3 mb-stack-lg">
        <span class="font-label-caps text-label-caps text-primary tracking-widest uppercase">Sélection coup de cœur</span>
        <h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-3 text-3xl font-semibold">
          <span class="material-symbols-outlined text-[#ff5c5c]" style="font-variation-settings: 'FILL' 1;">favorite</span>
          Projets Phares
        </h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-2">
          Une sélection de mes travaux les plus marquants, alliant défis techniques, innovation et souci constant du détail.
        </p>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <span class="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></span>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        <router-link 
          v-for="proj in featuredProjects" 
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
            <div class="absolute top-3 right-3 bg-[#0b1326]/80 backdrop-blur border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5 z-10">
              <span class="material-symbols-outlined text-[14px] text-[#ff5c5c]" style="font-variation-settings: 'FILL' 1;">favorite</span>
              <span class="font-code-sm text-[11px] text-on-surface-variant uppercase tracking-wider">Coup de cœur</span>
            </div>
          </div>
          <div class="p-6 flex flex-col justify-between flex-grow gap-4">
            <div>
              <h3 class="font-headline-md text-xl text-white group-hover:text-primary transition-colors font-semibold">
                {{ proj.title }}
              </h3>
              <p class="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-3">
                {{ proj.description }}
              </p>
            </div>

            <!-- Tags in Project -->
            <div v-if="proj.Tags && proj.Tags.length > 0" class="flex flex-wrap gap-1.5 mt-auto">
              <span 
                v-for="t in proj.Tags.slice(0, 3)" 
                :key="t.id"
                class="text-xs font-code-sm text-secondary bg-secondary/5 px-2.5 py-0.5 rounded border border-secondary/10"
              >
                {{ t.name }}
              </span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="flex justify-center mt-12">
        <router-link to="/projets" class="bg-surface-container/60 border border-white/10 text-on-surface font-body-md text-body-md font-medium px-8 py-4 rounded-lg hover:bg-surface-container/80 transition-all duration-300 active:scale-95 flex items-center gap-2">
          Voir toutes mes réalisations
          <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
        </router-link>
      </div>
    </section>
  </div>
</template>
