<template>
  <header></header>
  <dock v-if="isScrolling || hoveringNav || mouseMoving" class="navBar" :model="sections" :position="navPosition" @mouseover="hoveringNav = true" @mouseleave="hoveringNav = false">
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
  <main ref="scrollSection" data-scroll-container>
    <landing-page :pictures="['daniel3.jpg', 'daniel2.jpg', 'daniel4.jpg', 'daniel5.jpg']" logo="logo_white.png"/>
    <about-me :description="description" :photoGrid="['daniel3.jpg', 'daniel2.jpg', 'daniel5.jpg', 'daniel4.jpg']" />
  </main>
  <app-footer/>
</template>
<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import LandingPage from './components/LandingPage.vue';
import AboutMe from './components/AboutMe.vue';
import { onMounted, nextTick, ref, onBeforeUnmount } from 'vue';
import locomotiveScroll from 'locomotive-scroll';

/**
 **************************************
 ************* Navbar *****************
 **************************************
 */
  const sections = [
    {label: 'about me', icon: 'nav_daniel.svg', id: 'about-me'},
    {label: 'music', icon: 'nav_turntable.svg', id: 'music'},
    {label: 'gallery', icon: 'nav_image.svg', id: 'gallery'},
    {label: 'contact', icon: 'nav_addressCard.svg', id: 'contact'},
  ]

  /**
   * Define position of navbar based on window width
   */
  onMounted(() => nextTick(() => {
    window.addEventListener('resize', onResize);
    onResize();
  }))
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))
  const onResize = () => {
    navPosition.value = window.innerWidth > 900 ? 'right' : 'top';
  }
  const navPosition = ref<'right' | 'top'>('right');

  /**
   * Handle show navbar on scroll
   */
  const isScrolling = ref(false);
  let timeoutIdScroll = 0;
  onMounted(() => nextTick(() => scrollDetector()))
  const scrollDetector = () => {
    window.addEventListener('scroll', () => {
      isScrolling.value = true;
      window.clearTimeout(timeoutIdScroll);
      timeoutIdScroll = setTimeout(() => setTimeout(() => isScrolling.value = false, 3000), 100)
    })
  }

  /*
   * Handle show navbar when hovering over it
   */
  const hoveringNav = ref(false);

  /*
   * Handle show navbar on mouse moving
   */
  const mouseMoving = ref(false);
  let timeoutIdMouse = 0;
  onMounted(() => nextTick(() => window.addEventListener('mousemove', onMousemove)))
  onBeforeUnmount(() => window.removeEventListener('mousemove', onMousemove))
  const onMousemove = () => {
    mouseMoving.value = true;
    window.clearTimeout(timeoutIdMouse);
    timeoutIdMouse = setTimeout(() => setTimeout(() => mouseMoving.value = false, 3000), 100)
  }

/**
 **************************************
 ********** Landing Page **************
 **************************************
 */

const scrollSection = ref(null);
const scroll = ref<locomotiveScroll>();
const scrollIns = null;

const initLocoScroll = () => {
  scroll.value = new locomotiveScroll({
    el: scrollSection.value,
    smooth: true,
    getDirection: true,
    smartphone: {
      breakpoint: 0,
      smooth: true,
      getDirection: true,
    },
    tablet: {
      breakpoint: 0,
      smooth: true,
      getDirection: true,
    },
  });
}

onMounted(() => {
  nextTick(() => {
    initLocoScroll();
  })
})

/**
 **************************************
 ************ About Me ****************
 **************************************
 */

 const description = "Daniel Daub ist ein DJ aus Mainz. Mit einer knackigen Mischung der neusten Songs aus dem Musikbusiness sowie ihren All Time Favourites weiß der Mainzer Bar-, Club und Veranstaltungsgänger jeden Gast zu begeistern. Seine Vielfältigkeit, die er beim Auflegen zeigt, machte ihn schnell als neuartigen Künstlertypus bei einer Reihe namhafter Veranstalter bekannt. Auf seinen Partys zitiert er gerne House, Hip-Hop, Classics, 90er und Rock immer überraschend, immer mit Style. Seine Sets schaffen damit den unvergleichlichen Spagat zwischen den letzten zwei Jahrzehnten und den Best Ofs. Das macht das Charisma von Daniel Daub aus."

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
