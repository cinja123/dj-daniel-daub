<template>
  <a :href="props.url">
    <img class="icon-small iconBG color-orange" :alt="props.label" :src="require(`../assets/media/icons/${props.icon}`)" />
    <span>{{ props.label }}</span>
  </a>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue';

  /**
   * url: url for href
   * icon: name of to be displayed icon file
   * label: label showing up next to icon
   */
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
      padding: 0 10px;
    }
  }
  
</style>
