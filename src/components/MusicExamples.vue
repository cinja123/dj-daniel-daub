
<template>
  <article id="music">
    <div id="music-wrapper">
      <div data-scroll data-scroll-sticky data-scroll-target="#music-wrapper" style="border:1px dashed red;">
        <h3 data-scroll data-scroll-speed="-20" data-scroll-direction="horizontal">Music</h3>
        <YoutubeLayer :videoId="props.videoIds[0]" title="Test Title" />

        

        <!-- <div id="horizontal-scroll-wrapper">
          <div ref="youtube" v-for="video, index in props.videoIds" :key="index">
            <YoutubeVue3 :videoid="video" :loop="1" :autoplay="0" :width="480" :height="320"/>
          </div>
        </div> -->
      </div>

    </div>
    
  </article>
</template>
<script lang="ts" setup>
  import { defineProps, defineEmits, nextTick, onMounted } from 'vue';
  import YoutubeLayer from './YoutubeLayer.vue';

  const props = defineProps<{
    videoIds: string[];
  }>()

  const emit = defineEmits<{
    (e: 'rendered',): void;
  }>()

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