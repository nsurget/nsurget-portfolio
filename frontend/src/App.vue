<script setup>
import TopNavBar from './components/TopNavBar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen relative overflow-hidden bg-background">
    <!-- Ambient Grid Overlay -->
    <div class="fixed inset-0 pointer-events-none bg-grid z-0"></div>

    <TopNavBar class="z-50" />
    
    <!-- Main Content -->
    <main class="flex-grow z-10">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer class="z-10 mt-auto" />
  </div>
</template>

<style>
/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
