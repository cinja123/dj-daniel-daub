<template>
  <app-header :items="sections" />

  <main style="height: 50vh"></main>

  <app-footer/>
</template>
<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';

const sections = [
  {label: 'about me', icon: 'danielFace.svg', id: 'about-me'},
  {label: 'music', icon: 'turntable.svg', id: 'music'},
  {label: 'gallery', icon: 'image.svg', id: 'gallery'},
  {label: 'contact', icon: 'addressCard.svg', id: 'contact'},
]

</script>
<style lang="scss" scoped>

</style>
