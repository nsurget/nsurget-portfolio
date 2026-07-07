<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToProjects = () => {
  router.push('/projets');
};

const navigateToEducation = () => {
  router.push('/competences');
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
        
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-white/10">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span class="font-code-sm text-code-sm text-on-surface-variant">Disponible pour de nouveaux défis</span>
        </div>
        
        <h1 class="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg max-w-4xl text-on-surface drop-shadow-2xl">
          Développeur Web <br class="hidden md:block"/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Expert E-commerce</span>
        </h1>
        
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4">
          Développeur web chez <span class="text-primary font-medium">Coqpit</span>, spécialisé dans la conception d'expériences numériques performantes, l'intégration e-commerce et le développement d'interfaces modernes avec <span class="text-secondary font-medium">Vue.js</span> et <span class="text-primary font-medium">React</span>.
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
    </section>

    <!-- About Section (Asymmetric Bento/Glassmorphism) -->
    <section class="py-[120px] max-w-container-max mx-auto px-margin-mobile md:px-stack-lg relative">
      
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
              Mon parcours a débuté dans l'écosystème exigeant de l'<strong class="text-on-surface">e-commerce</strong>, où la performance, la conversion et l'expérience utilisateur sont vitales. J'ai développé des sites vitrines et marchands, automatisé la maintenance et connecté des sites à des ERP/CRM tiers via des tâches CRON.
            </p>
            <p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Aujourd'hui, je poursuis une formation de Concepteur Développeur Logiciel (Full Stack) chez OpenClassRooms pour monter en compétences sur les architectures modernes. En maîtrisant des frameworks comme <span class="bg-primary/10 text-primary px-2 py-0.5 rounded font-code-sm text-code-sm">Vue.js</span> et <span class="bg-secondary/10 text-secondary px-2 py-0.5 rounded font-code-sm text-code-sm">React</span>, je construis des interfaces fluides, robustes et optimisées pour les utilisateurs finaux.
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
  </div>
</template>
