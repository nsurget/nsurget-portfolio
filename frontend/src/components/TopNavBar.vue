<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isMobileMenuOpen = ref(false);

const navLinks = [
  { name: 'Profil', path: '/' },
  { name: 'Projets', path: '/projets' },
  { name: 'Compétences', path: '/competences' },
  { name: 'Loisirs', path: '/loisirs' }
];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <nav class="fixed top-0 w-full z-50 bg-[#0b1326] border-b border-white/10 shadow-sm transition-all duration-300">
    <div class="flex justify-between items-center h-20 px-margin-mobile md:px-stack-lg max-w-container-max mx-auto w-full">
      <!-- Brand -->
      <router-link to="/" class="font-headline-md text-headline-md font-bold text-primary active:scale-95 transition-transform hover:opacity-90 duration-300 rounded px-2 -ml-2">
        nsurget
      </router-link>

      <!-- Navigation Links (Desktop) -->
      <div class="hidden md:flex items-center gap-6 font-body-md text-body-md">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          class="text-on-surface-variant hover:text-primary transition-all duration-300 px-3 py-1.5 rounded active:scale-95 transition-transform"
          active-class="text-primary border-b-2 border-primary rounded-none"
        >
          {{ link.name }}
        </router-link>
      </div>

      <!-- Trailing Action -->
      <a href="mailto:ncsrgt@gmail.com" class="font-body-md text-body-md bg-primary text-on-primary px-6 py-2.5 rounded-full font-medium hover:shadow-[0_0_20px_rgba(105,220,164,0.4)] transition-all duration-300 active:scale-95 hidden md:block text-center">
        Contactez-moi
      </a>

      <!-- Mobile Menu Icon -->
      <button @click="toggleMobileMenu" class="md:hidden text-on-surface hover:text-primary transition-colors flex items-center">
        <span class="material-symbols-outlined">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-[#0b1326] border-b border-white/10 px-margin-mobile py-6 flex flex-col gap-4">
      <router-link 
        v-for="link in navLinks" 
        :key="link.path"
        :to="link.path"
        @click="isMobileMenuOpen = false"
        class="text-on-surface-variant hover:text-primary font-body-lg text-body-lg py-2 transition-colors"
        active-class="text-primary font-semibold"
      >
        {{ link.name }}
      </router-link>
      <a href="mailto:ncsrgt@gmail.com" class="bg-primary text-on-primary text-center py-3 rounded-lg font-medium active:scale-95 transition-transform mt-2">
        Contactez-moi
      </a>
    </div>
  </nav>
</template>
