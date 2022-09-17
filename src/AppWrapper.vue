<template>
  <dock class="navBar" :model="sections" :position="navPosition">
    <template #icon="{ item }">
      <img class="icon iconBG color-white" 
        :alt="item.label?.toString()" 
        :src="require(`./assets/media/icons/${item.icon}`)"
      />
    </template>
  </dock>

  <main style="height: 80vh"></main>

  <app-footer/>
</template>
<script setup lang="ts">
  import AppFooter from '@/components/AppFooter.vue';
  import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

  const sections = [
    {label: 'about me', icon: 'nav_daniel.svg', id: 'about-me'},
    {label: 'music', icon: 'nav_turntable.svg', id: 'music'},
    {label: 'gallery', icon: 'nav_image.svg', id: 'gallery'},
    {label: 'contact', icon: 'nav_addressCard.svg', id: 'contact'},
  ]

  /**
   * Define position of navbar based on window width
  */
  onMounted(() => {
    nextTick(() => window.addEventListener('resize', onResize))
  })
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))
  const onResize = () => {
    navPosition.value = window.innerWidth > 900 ? 'right' : 'top';
  }
  const navPosition = ref<'right' | 'top'>('right');

</script>
<style lang="scss" scoped>
  .navBar {
    position: fixed;

    img {
      transition: all 0.2 ease;
      width: 40px !important; 
      margin: 20px 15px;
      cursor: pointer;
  
      &:hover, &:focus {
        filter: invert(78%) sepia(42%) saturate(7374%) hue-rotate(359deg) brightness(100%) contrast(105%);
      }
    }
  }
</style>
