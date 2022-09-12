<template>
  <header></header>
  <main>
    <div ref="scrollSection" style="min-height: 200vh">
      <div data-scroll-container>
          <div data-scroll-section>
              <h1 data-scroll>Hey</h1>
              <p data-scroll>👋</p>
          </div>
          <div data-scroll-section>
              <h2 data-scroll data-scroll-speed="1">What's up?</h2>
              <p data-scroll data-scroll-speed="2">😬</p>
          </div>
      </div>
    </div>
  </main>
  <app-footer/>
</template>
<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import locomotiveScroll from 'locomotive-scroll';
import { onMounted, nextTick, ref } from 'vue';


const scrollSection = ref(null);
const scroll = ref<locomotiveScroll>();
const scrollIns = null;

const initLocoScroll = () => {
  scroll.value = new locomotiveScroll({
    el: scrollSection.value,
    smooth: true,
    smoothMobile: true,
    getDirection: true,
  });
}

onMounted(() => {
  nextTick(() => {initLocoScroll()})
})

</script>
<style lang="scss" scoped>

</style>
