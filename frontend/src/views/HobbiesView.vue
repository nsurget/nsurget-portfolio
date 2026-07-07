<template>
  <div class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-stack-lg py-stack-lg md:py-[80px] pt-28">
    <!-- Header Section -->
    <div class="mb-stack-lg max-w-3xl">
      <h1 class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-stack-sm tracking-tighter">
        Au-delà de <span class="gradient-text">l'IDE</span>.
      </h1>
      <p class="font-body-lg text-body-lg text-on-surface-variant">
        Explorer l'analogique et la créativité. C'est ici que je déconnecte pour me ressourcer, trouvant l'inspiration dans les objectifs, le café et les interrupteurs mécaniques.
      </p>
    </div>

    <!-- Bento Grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- Hobby 1: Photography (Large Span) -->
      <div class="glass-card rounded-xl overflow-hidden col-span-12 md:col-span-8 flex flex-col md:flex-row relative group transition-all duration-300">
        <div class="w-full md:w-1/2 h-64 md:h-auto relative">
          <img 
            alt="Photographie contrastée d'un appareil photo argentique vintage" 
            class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
            draggable="false"
            src="https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=800&q=80"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-surface/80 to-transparent"></div>
        </div>
        <div class="p-stack-md flex flex-col justify-center w-full md:w-1/2 relative z-10">
          <div class="flex items-center gap-2 mb-stack-sm text-primary">
            <span class="material-symbols-outlined">photo_camera</span>
            <span class="font-label-caps text-label-caps tracking-widest uppercase">Photographie</span>
          </div>
          <h3 class="font-headline-md text-headline-md text-on-surface mb-base text-2xl font-bold">Urbaine &amp; Macro</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Capturer la géométrie de la ville et les détails complexes des circuits imprimés. Je photographie principalement en hybride, avec un penchant pour le noir et blanc contrasté qui souligne les structures.
          </p>
        </div>
      </div>

      <!-- Hobby 2: Mechanical Keyboards (Small Span) -->
      <div class="glass-card rounded-xl p-stack-md col-span-12 md:col-span-4 flex flex-col justify-between relative group transition-all duration-300 min-h-[220px]">
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-2 text-secondary">
            <span class="material-symbols-outlined">keyboard</span>
            <span class="font-label-caps text-label-caps tracking-widest uppercase">Claviers</span>
          </div>
        </div>
        <div>
          <h3 class="font-headline-md text-[24px] font-semibold text-on-surface mb-base font-bold text-xl mt-4">Montages Perso</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Lubrification des switchs et réglage des stabilisateurs. La quête du "thock" parfait est un artisanat technique méticuleux qui accompagne idéalement mes sessions de code.
          </p>
        </div>
      </div>

      <!-- Hobby 3: Specialty Coffee (Small Span) -->
      <div class="glass-card rounded-xl p-stack-md col-span-12 md:col-span-5 flex flex-col justify-between relative group transition-all duration-300 min-h-[220px]">
        <div class="flex items-center gap-2 text-tertiary">
          <span class="material-symbols-outlined">local_cafe</span>
          <span class="font-label-caps text-label-caps tracking-widest uppercase">Extraction</span>
        </div>
        <div>
          <h3 class="font-headline-md text-[24px] font-semibold text-on-surface mb-base font-bold text-xl mt-4">Café de Spécialité</h3>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Extraire l'espresso parfait est un exercice de précision — mouture, rendement, temps d'extraction. C'est de la science appliquée chaque matin.
          </p>
        </div>
      </div>

      <!-- Hobby 4: Generative Art (Medium Span) -->
      <div class="glass-card rounded-xl overflow-hidden col-span-12 md:col-span-7 flex flex-col relative group min-h-[300px] transition-all duration-300 justify-end">
        <div class="absolute inset-0 w-full h-full opacity-40 group-hover:opacity-80 transition-opacity duration-700">
          <img 
            alt="Art génératif abstrait avec des formes géométriques lumineuses" 
            class="w-full h-full object-cover" 
            draggable="false"
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
        <div class="p-stack-md relative z-10">
          <div class="flex items-center gap-2 mb-stack-sm text-primary">
            <span class="material-symbols-outlined">code</span>
            <span class="font-label-caps text-label-caps tracking-widest uppercase">Code Créatif</span>
          </div>
          <h3 class="font-headline-md text-[24px] font-semibold text-on-surface mb-base font-bold text-2xl">Art Génératif</h3>
          <p class="font-body-md text-body-md text-on-surface-variant max-w-xl">
            Utilisation de WebGL et de Canvas pour créer des visuels algorithmiques interactifs. Effacer la frontière entre l'ingénierie web et l'expression esthétique.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
