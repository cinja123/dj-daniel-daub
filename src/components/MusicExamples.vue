
<template>
  <article id="music">
    <div id="music-wrapper">
      <div data-scroll data-scroll-sticky data-scroll-target="#music-wrapper" style="border:1px dashed red;">
        <h3 data-scroll data-scroll-speed="-20" data-scroll-direction="horizontal">Music</h3>
        <div id="horizontal-scroll-wrapper">
          <div ref="youtube" v-for="video, index in props.videoIds" :key="index">
            <YoutubeVue3 :videoid="video" :loop="1" :autoplay="0" :width="480" :height="320"/>
          </div>
        </div>
      </div>

    </div>
    
  </article>
</template>
<script lang="ts" setup>
  import { defineProps, defineEmits, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
  import { YoutubeVue3 } from 'youtube-vue3'
  import locomotiveScroll from 'locomotive-scroll';

  const props = defineProps<{
    videoIds: string[];
    scroller: locomotiveScroll;
  }>()

  const emit = defineEmits<{
    (e: 'rendered',): void;
  }>()

  const youtube = ref();
  console.log('ref', youtube);

  const screenWidth = ref(0);
  const updateWidth = () => {
    screenWidth.value = window.innerWidth;
  }

  onMounted(() => {
    nextTick(() => {
      updateWidth();
      window.addEventListener('resize', updateWidth);
      window.addEventListener('load', () => {
        emit('rendered');
      })
    })
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWidth);
  })

</script>
<style lang="scss" scoped>
  #music {
    border: 3px solid green;
    min-height: 100vh;
    padding-bottom: 90vh;

    #music-wrapper {
      background-color: rgba(100, 0,0,0.2);
      height: 100vh;

      > div:first-child {
        height: 150px;
        h3 {
          border: 1px dashed white;
          position: relative;
          left: 35vw;
          line-height: 150px;
          margin: 0;
        } 
      }

      #horizontal-scroll-wrapper {
        display: flex;
        background-color: var(--main-text);
        border-radius: 20px;
        padding: 150px 10% 80px  10%;
        margin: 0 10%;
        overflow-x: hidden;

      }
    }
  }
</style>