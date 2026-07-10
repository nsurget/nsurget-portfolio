<script setup>
import { ref, onMounted } from 'vue';
import PageHeader from '../components/PageHeader.vue';

const hobbies = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch('/api/hobbies');
    hobbies.value = await res.json();
  } catch (error) {
    console.error('Failed to load hobbies:', error);
  } finally {
    isLoading.value = false;
  }
});

// A dynamic styling mapper based on Hobby ID/name with fallback
const getHobbyAesthetics = (hobby, index) => {
  const aesthetics = {
    'HOBBY-AUDIOVISUEL': {
      icon: 'movie',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-12 md:col-span-8',
      flexClass: 'flex flex-col md:flex-row',
      imageContainerClass: 'w-full md:w-1/2 h-64 md:h-auto min-h-[16rem]',
      textContainerClass: 'w-full md:w-1/2',
      colorClass: 'text-primary',
    },
    'HOBBY-MONTAGE-PHOTOS-VIDEOS': {
      icon: 'video_camera_back',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-12 md:col-span-4',
      flexClass: 'flex flex-col justify-between',
      imageContainerClass: 'w-full h-48 relative',
      textContainerClass: 'w-full',
      colorClass: 'text-secondary',
    },
    'HOBBY-SPORTS': {
      icon: 'hiking',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-12',
      flexClass: 'flex flex-col md:flex-row-reverse',
      imageContainerClass: 'w-full md:w-1/2 h-64 md:h-auto min-h-[16rem]',
      textContainerClass: 'w-full md:w-1/2',
      colorClass: 'text-tertiary',
    }
  };

  if (aesthetics[hobby.id]) {
    return aesthetics[hobby.id];
  }

  // Fallbacks based on index
  const icons = ['interests', 'palette', 'sailing', 'sports_esports'];
  const colors = ['text-primary', 'text-secondary', 'text-tertiary'];
  
  const spanPattern = ['col-span-12 md:col-span-6', 'col-span-12 md:col-span-6', 'col-span-12'];
  const flexPattern = ['flex flex-col', 'flex flex-col', 'flex flex-col md:flex-row'];
  
  const pIdx = index % 3;
  
  return {
    icon: icons[index % icons.length],
    image: `https://images.unsplash.com/photo-${1500000000000 + (index * 100000)}?auto=format&fit=crop&w=800&q=80`,
    span: spanPattern[pIdx],
    flexClass: flexPattern[pIdx],
    imageContainerClass: pIdx === 2 ? 'w-full md:w-1/2 h-64 md:h-auto min-h-[16rem] relative' : 'w-full h-48 relative',
    textContainerClass: pIdx === 2 ? 'w-full md:w-1/2' : 'w-full',
    colorClass: colors[index % colors.length]
  };
};
</script>

<template>
  <div class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-stack-lg pt-32 pb-stack-lg relative">
    <!-- Header Section -->
    <PageHeader 
      title="Au-delà de <strong>l'IDE</strong>." 
      description="Explorer l'analogique et la créativité. C'est ici que je déconnecte pour me ressourcer, trouvant l'inspiration dans les objectifs, le café et les interrupteurs mécaniques." 
    />

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <span class="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></span>
    </div>

    <!-- Bento Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div 
        v-for="(hobby, index) in hobbies"
        :key="hobby.id"
        class="glass-card rounded-xl overflow-hidden relative group transition-all duration-300"
        :class="[getHobbyAesthetics(hobby, index).span, getHobbyAesthetics(hobby, index).flexClass]"
      >
        <!-- Image Container -->
        <div :class="getHobbyAesthetics(hobby, index).imageContainerClass">
          <img 
            :alt="hobby.name" 
            class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
            draggable="false"
            :src="getHobbyAesthetics(hobby, index).image"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-surface/80 to-transparent"></div>
        </div>

        <!-- Content Container -->
        <div class="p-stack-md flex flex-col justify-center relative z-10" :class="getHobbyAesthetics(hobby, index).textContainerClass">
          <div class="flex items-center gap-2 mb-stack-sm" :class="getHobbyAesthetics(hobby, index).colorClass">
            <span class="material-symbols-outlined">{{ getHobbyAesthetics(hobby, index).icon }}</span>
            <span class="font-label-caps text-label-caps tracking-widest uppercase">{{ hobby.name }}</span>
          </div>
          <h3 class="font-headline-md text-headline-md text-on-surface mb-base text-2xl font-bold">
            {{ hobby.name }}
          </h3>
          <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {{ hobby.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
