
<template>
  <article id="music">
    <div id="music-wrapper">
      <!-- WIDER SCREEN (>= 1000px) -->
      <div v-if="videoWidth > 351"
        data-scroll data-scroll-sticky data-scroll-target="#music-wrapper"
      >
        <div class="black-box"></div>
        <h3 data-scroll data-scroll-speed="-20" data-scroll-direction="horizontal">Music</h3>
        <section class="videos-wrapper">
          <YoutubeLayer v-for="(video, index) in props.videos" :key="index" class="video"
            data-scroll :data-scroll-speed="index%2 === 0 ? 2 : -2" :data-scroll-direction="videoWidth < 351 ? 'horizontal' : 'vertical'"
            :videoId="video.id" 
            :title="video.title"
            :width="videoWidth"
            :height="videoHeight"
            :radius="videoHeight / 4"
          ></YoutubeLayer>
        </section>
      </div>

      <!-- SMALLER SCREEN (< 1000px) -->
      <div v-else>
        <h3  data-scroll data-scroll-speed="-5" data-scroll-direction="horizontal">Music</h3>
        <section class="videos-wrapper" data-scroll data-scroll-sticky data-scroll-target="#music-wrapper">
          <YoutubeLayer v-for="(video, index) in props.videos" :key="index" class="video"
            data-scroll :data-scroll-speed="index%2 === 0 ? 2 : -2" :data-scroll-direction="videoWidth < 351 ? 'horizontal' : 'vertical'" 
            :videoId="video.id" 
            :title="video.title"
            :width="videoWidth"
            :height="videoHeight"
            :radius="videoHeight / 4"
          ></YoutubeLayer>
        </section>
      </div>
      <div class="black-bg"></div>
    </div>
    
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
    return (videoWidth.value / 4) * 3;
  })
  const onResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 324) {
      videoWidth.value = screenWidth - 24;
    }
    else if (screenWidth < 500) {
      videoWidth.value = 300;
    }
    else if (screenWidth < 1000) {
      videoWidth.value = 350;
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

    #music-wrapper {
      background-color: var(--main-text);
      border: 1px dashed rgba(92, 163, 153, 0.641);
      min-height: 100vh; 

      > div:first-child {
        .black-box {
          background-color: var(--main-bg);
          width: 100vw;
          height: 75px;
        }
        
        h3 {
          position: absolute;
          top: -75px;
          margin: 0;
          line-height: 150px;
          font-size: 3rem;
          font-weight: 400;
          color: var(--orange);

          @media screen and (min-width: 1001px) {
            position: relative;
            top: 0;
            left: 35vw;
            margin-top: -75px;

          }          
        } 
      
        .videos-wrapper {
          padding-top: 20px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          @media screen and (min-width: 1001px) {
            justify-content: space-around;
          }
          .video {
            margin: 20px 20%;

            @media screen and (min-width: 1001px) {
              margin: 15vh 0;
            }
          }
        }
      }

      .black-bg {
        height: 150vh; 
        width: 100vw; 
        background-color: #000;
        margin-top: 100vh;
      }
    }
  }
</style>