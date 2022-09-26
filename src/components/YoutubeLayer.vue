<template>
  <section class="video-wrapper">
    <YoutubeVue3 ref="youTube" :videoid="props.videoId" :loop="1" :autoplay="0" :width="480" :height="320"/>
    <div class="video-layer">
      <svg class="transparent-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"
        preserveAspectRatio="xMidYMid meet" style="transform: scale(1.03);"
      >
        <defs>
          <mask id="maskvideo" x="0" y="0" width="100%" heigth="100%">
            <rect class="maskRect" x="0" y="0" width="100%" height="100%"></rect>
            <text class="video" x="50%" y="106" dominant-baseline="start" text-anchor="middle">
              {{props.title}}
            </text>
            <circle cx="50%" cy="50%" r="40" fill="black"></circle>
          </mask>
        </defs>
        <rect class="video" x="0" y="0" width="100%" height="100%"></rect>
      </svg>
    </div>
  </section>
</template>
<script lang="ts" setup>
  import { YoutubeVue3 } from 'youtube-vue3'
  import { defineProps, nextTick, onMounted, ref } from 'vue';

  const props = defineProps<{
    videoId: string;
    title: string;
  }>()

  const youTube = ref()
  onMounted(() => {
    nextTick(() => {
      youTube.value.player.mute();
      youTube.value.player.playVideo();
    })
  })
</script>
<style lang="scss" scoped>
  .video-wrapper {
    display: inline-block;
    position: relative;


    .video-layer {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      svg.transparent-text {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        transform: rotate(0.01deg) scale(1.03);
        transition: transform 1s;
        will-change: transform;

        rect.maskRect {
          fill: var(--main-text);
        }

        text {
          font-weight: 900;
          font-size: 1.5rem;
          text-transform: uppercase;
        }

        rect.video {
          fill: var(--main-text);
          -webkit-mask: url(#maskvideo);
          mask: url(#maskvideo);
        }
      }

    }

  }
</style>