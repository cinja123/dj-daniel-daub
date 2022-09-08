<template>
  <a :href="props.url">
    <img :alt="props.label" :src="require(`../assets/media/icons/${props.icon}`)" />
    <span>{{ props.label }}</span>
  </a>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue';

  const props = defineProps<{
    url: string;
    icon: string;
    label: string;
  }>();
</script>
<style scoped lang="scss">
  a {
    text-decoration: none;
    color: var(--text-main);
    display: flex;
    align-items: center;
    img {
      width: 1rem;
      min-width: 16px;
      padding: 0 10px;
    }
  }
  
</style>
