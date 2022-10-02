
<template>
  <article id="music">
    <div id="music-wrapper">
      <div data-scroll data-scroll-sticky data-scroll-target="#music-wrapper" style="border:1px dashed red;">
        <div class="black-box"></div>
        <h3 data-scroll data-scroll-speed="-20" data-scroll-direction="horizontal">Music</h3>
        <section class="video-wrapper">
          <YoutubeLayer v-for="(video, index) in props.videos" :key="index" 
            :videoId="video.id" 
            :title="video.title"
            :width="videoWidth"
            :height="videoHeight"
            :radius="videoHeight / 4"
          ></YoutubeLayer>
        </section>
      </div>
    </div>
    <div style="height: 100vh; border: 1px solid green; width: 100vw"></div>
  </article>
</template>
<script lang="ts" setup>
  import { defineProps, defineEmits, nextTick, onMounted, ref, onBeforeUnmount, computed } from 'vue';
  import YoutubeLayer from './YoutubeLayer.vue';
  import { Video } from '@/models/VideoModel';

  const props = defineProps<{
    videos: Video[];
  }>()

  const emit = defineEmits<{
    (e: 'rendered',): void;
  }>()

  const videoWidth = ref(0);
  const videoHeight = computed(() => {
    return (videoWidth.value / 16) * 9;
  })
  const onResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 324) {
      videoWidth.value = screenWidth - 24;
    }
    else if (screenWidth < 500) {
      videoWidth.value = 300;
    }
    else {
      videoWidth.value = 480;
    }
  }
  onMounted(() => nextTick(() => {
    window.addEventListener('resize', onResize);
    onResize();
  }))
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))

  onMounted(() => {
    nextTick(() => {
      window.addEventListener('load', () => {
        emit('rendered');
      })
    })
  })


</script>
<style lang="scss" scoped>
  #music {
    border: 3px solid green;
    width: 100vw;
    min-height: 100vh;
    padding-bottom: 0 12px 90vh 12px;

    #music-wrapper {
      background-color: var(--main-text);
      height: 100vh;

      > div:first-child {
        height: 150px;
        .black-box {
          background-color: var(--main-bg);
          width: 100vw;
          height: 75px;
        }
        h3 {
          //border: 1px dashed white;
          position: relative;
          left: 35vw;
          line-height: 150px;
          margin: 0;
          font-size: 3rem;
          font-weight: 400;
          color: var(--orange);
          margin: -75px 0 10vh 0;
        } 

        .video-wrapper {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          
        }
      }

    }
  }
</style>