<template>
  <header></header>
  <dock v-if="isScrolling || hoveringNav || mouseMoving" class="navBar" :model="sections"
    :position="navPosition" @mouseover="hoveringNav = true" @mouseleave="hoveringNav = false">
    <template #icon="{ item }">
      <div class="item-wrapper" @click="scrollToSection(item.id)">
        <span v-if="navPosition === 'right'" :class="'label-' + navPosition">{{ item.label }}</span>
        <img :class="`icon iconBG color-white nav-${navPosition}`" :alt="item.label?.toString()"
          :src="require(`./assets/media/icons/${item.icon}`)" />
      </div>
    </template>
  </dock>
  <Loading :active="!store.visited" :is-full-page="true" color="var(--orange)" />
  <div ref="scrollSection" data-scroll-container>
    <main>
      <landing-page :pictures="['daniel3.jpg', 'daniel2.jpg', 'daniel4.jpg', 'daniel5.jpg']"
        logo="logo_white.png" data-scroll-section @rendered="updateScroll" />
      <about-me :description="description"
        :photoGrid="['daniel3.jpg', 'daniel2.jpg', 'daniel5.jpg', 'daniel4.jpg']"
        data-scroll-section @rendered="updateScroll" />
      <music-examples :videos="videos" :scroller="scroll" data-scroll-section
        @rendered="updateScroll"></music-examples>
      <gallery-view :pictures="gallery" data-scroll-section @rendered="updateScroll"></gallery-view>
      <contact-form :items="contactItems"
        :style="`z-index: ${navPosition === 'right' ? 0 : 10}; position: relative;`"
        data-scroll-section />
    </main>
    <app-footer data-scroll-section @rendered="updateScroll"></app-footer>
  </div>


</template>
<script setup lang="ts">
import Loading from 'vue-loading-overlay';
import AppFooter from '@/components/AppFooter.vue';
import LandingPage from './components/LandingPage.vue';
import AboutMe from './components/AboutMe.vue';
import MusicExamples from './components/MusicExamples.vue';
import GalleryView from './components/GalleryView.vue';
import { onMounted, nextTick, ref, onBeforeUnmount, watch, markRaw } from 'vue';
import locomotiveScroll from 'locomotive-scroll';
import { Video } from '@/models/VideoModel';
import { Picture } from './models/PictureModel';
import ContactForm from './components/ContactForm.vue';
import EventForm from '@/components/forms/EventForm.vue';
import LocationForm from '@/components/forms/LocationForm.vue';
import UserForm from '@/components/forms/UserForm.vue';
import { store } from '@/store';

const screenWidth = ref(0);
const onResize = () => { screenWidth.value = window.innerWidth; }
onMounted(() => nextTick(() => {
  window.addEventListener('resize', onResize);
  onResize();
}))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

/**
 **************************************
 ************* Navbar *****************
 **************************************
 */
const sections = [
  { label: 'about me', icon: 'nav_daniel.svg', id: 'about-me' },
  { label: 'music', icon: 'nav_turntable.svg', id: 'music' },
  { label: 'gallery', icon: 'nav_image.svg', id: 'gallery' },
  { label: 'contact', icon: 'nav_addressCard.svg', id: 'contact' },
]

/**
 * Define position of navbar based on window width
 */
const navPosition = ref<'right' | 'top'>('right');
watch(screenWidth, () => navPosition.value = window.innerWidth > 900 ? 'right' : 'top')

/**
 * Handle show navbar on scroll
 */
const isScrolling = ref(false);
let timeoutIdScroll: any = 0;
const scrollDetector = () => {
  scroll.value.on('scroll', () => {
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
let timeoutIdMouse: any = 0;
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
const scroll = ref<any>();
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

let timeoutidRendered: any = 0;
const updateScroll = () => {
  window.clearTimeout(timeoutidRendered);
  timeoutidRendered = setTimeout(() => {
    store.visitLandingPage();
    console.log('update scroller');
    scroll.value.update();
  }, 700)
}

onMounted(() => {
  nextTick(() => {
    initLocoScroll();
    scrollDetector();
    if(store.visited) {
      updateScroll();
    }
  })
})

const scrollToSection = (section: string) => {
  scroll.value.scrollTo(document.querySelector(`#${section}`));
}


/**
 **************************************
 ************ About Me ****************
 **************************************
 */

const description = "Daniel Daub ist ein DJ aus Mainz. Mit einer knackigen Mischung der neusten Songs aus dem Musikbusiness sowie ihren All Time Favourites weiß der Mainzer Bar-, Club und Veranstaltungsgänger jeden Gast zu begeistern. Seine Vielfältigkeit, die er beim Auflegen zeigt, machte ihn schnell als neuartigen Künstlertypus bei einer Reihe namhafter Veranstalter bekannt. Auf seinen Partys zitiert er gerne House, Hip-Hop, Classics, 90er und Rock immer überraschend, immer mit Style. Seine Sets schaffen damit den unvergleichlichen Spagat zwischen den letzten zwei Jahrzehnten und den Best Ofs. Das macht das Charisma von Daniel Daub aus."

/**
 **************************************
 ************ Music Ex ****************
 **************************************
 */

const videos = ref<Video[]>([
  { id: '8NRYD-hPzzM', title: 'Summer Vibes House Mix' },
  { id: 'sZnS-NtqLIo', title: 'Funky House Mix' },
  { id: 'wT4wPsBtPA4', title: 'Charts House Mix' }
])

/**
**************************************
************* Gallery ****************
**************************************
*/

const gallery = ref<Picture[][]>([]);
for (let i = 0; i < 4; i++) {
  gallery.value.push([]);
  gallery.value[i].push(new Picture('danielvinyl.jpg', 'daniel vinyl'));
  gallery.value[i].push(new Picture('daniel2.jpg', 'daniel 2'));
  gallery.value[i].push(new Picture('daniel4.jpg', 'daniel 4'));
}

/**
**************************************
************* Contact ****************
**************************************
*/

const eventForm = markRaw(EventForm);
const locationForm = markRaw(LocationForm);
const userForm = markRaw(UserForm);

const contactItems = [
  { label: 'event', component: eventForm, icon: 'eventIcon.svg' },
  { label: 'location', component: locationForm, icon: 'eventLocationIcon.svg' },
  { label: 'user', component: userForm, icon: 'userIcon.svg' }
]

</script>
<style lang="scss" scoped>
.vl-full-page {
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--main-bg);

  display: flex;
  align-items: center;
  justify-content: center;
}

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

    &:hover,
    &:focus {
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
