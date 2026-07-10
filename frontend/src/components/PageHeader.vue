<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
});

const formattedTitle = computed(() => {
  if (!props.title) return '';
  // If the title contains a strong tag, return as is (mixed formatting)
  if (props.title.includes('<strong>')) {
    return props.title;
  }
  // Otherwise, wrap the whole title in strong (gradient by default)
  return `<strong>${props.title}</strong>`;
});
</script>

<template>
  <header class="mb-stack-lg max-w-3xl flex flex-col gap-4 animate-fade-in-up">
    <h1 class="page-header-title font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface tracking-tighter pb-1">
      <slot name="title">
        <span v-html="formattedTitle"></span>
      </slot>
    </h1>
    <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
      <slot name="description">{{ description }}</slot>
    </p>
  </header>
</template>

<style scoped>
.page-header-title :deep(strong) {
  background: linear-gradient(135deg, #69dca4, #5cd5f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: inherit;
}
</style>
