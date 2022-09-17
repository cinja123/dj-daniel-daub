<template>

  <div style="position: fixed;">{{showNav}}</div>
  <dock v-if="isScrolling" class="navBar" :model="sections" :position="navPosition">
    <template #icon="{ item }">
      <div class="item-wrapper">
        <span v-if="navPosition === 'right'" :class="'label-' + navPosition">{{ item.label }}</span>
        <img :class="`icon iconBG color-white nav-${navPosition}`" 
          :alt="item.label?.toString()" 
          :src="require(`./assets/media/icons/${item.icon}`)"
        />
      </div>
    </template>
  </dock>

  <main style="height: 80vh"></main>

  <app-footer/>
</template>
<script setup lang="ts">
  import AppFooter from '@/components/AppFooter.vue';
  import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';


  const sections = [
    {label: 'about me', icon: 'nav_daniel.svg', id: 'about-me'},
    {label: 'music', icon: 'nav_turntable.svg', id: 'music'},
    {label: 'gallery', icon: 'nav_image.svg', id: 'gallery'},
    {label: 'contact', icon: 'nav_addressCard.svg', id: 'contact'},
  ]

  /**
   * Define position of navbar based on window width
   */
  onMounted(() => nextTick(() => window.addEventListener('resize', onResize)))
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))
  const onResize = () => {
    navPosition.value = window.innerWidth > 900 ? 'right' : 'top';
  }
  const navPosition = ref<'right' | 'top'>('right');

  /**
   * Handle show navbar on scroll
   */
  const isScrolling = ref(false);
  let timeoutId = 0;
  onMounted(() => nextTick(() => scrollDetector()))
  const scrollDetector = () => {
    window.addEventListener('scroll', () => {
      isScrolling.value = true;
      window.clearTimeout(timeoutId);
      timeoutId = setTimeout(() => isScrolling.value = false, 100)
    })
  }

</script>
<style lang="scss" scoped>
  .navBar {
    position: fixed;

    .item-wrapper {
      display: flex;
      align-items: center;

      img {
        width: 40px !important; 
        margin: 20px 15px;
        cursor: pointer;
      }

      .label-right {
        width: 80px;
        text-align: right;
        cursor: pointer;
        visibility: hidden;
        font-size: 0.5rem;
        transition: all 0.2s ease;
      }

      &:hover, &:focus {
        img {
          filter: invert(78%) sepia(42%) saturate(7374%) hue-rotate(359deg) brightness(100%) contrast(105%);
        }

        .label-right {
          visibility: visible;
        }
      }

    }

  }
</style>
