<template>
  <header>
    <flip-button v-for="item in props.items" :key="item.id"
       :icon="item.icon"
       :alt="item.label"
       :label="item.label"
    />
  </header>
</template>
<script setup lang="ts">
  import FlipButton from './FlipButton.vue';
  import { defineProps } from 'vue';

  const props = defineProps<{
    items: {label: string, icon: string, id: string}[];
  }>()

</script>
<style scoped lang="scss">
  header {
    padding: 5vh 0 3vh 0;
    border-bottom: 2px solid var(--orange);
  }
</style>