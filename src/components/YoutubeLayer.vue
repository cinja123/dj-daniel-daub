<template>
  <section class="video-wrapper">
    <YoutubeVue3 ref="youTube" :videoid="props.videoId" :loop="1" :autoplay="0" :width="props.width" :height="props.height" @paused="onVideoClick"/>
    <div ref="videoLayer" class="video-layer show" @click="onLayerClick">
      <svg class="transparent-text" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${props.width} ${props.height}`"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id="maskvideo" x="0" y="0" width="100%" heigth="100%">
            <rect class="maskRect" x="0" y="0" width="100%" height="100%"></rect>
            <text class="video" x="50%" y="250" dominant-baseline="start" text-anchor="middle">
              {{props.title}}
            </text>
            <circle cx="50%" cy="50%" :r="props.radius" fill="black"></circle>
          </mask>
        </defs>
        <rect class="video" x="0" y="0" width="100%" height="100%"></rect>
      </svg>
      <div class="play">
        <img :src="require('@/assets/media/icons/play.svg')" alt="Play" />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
  import { YoutubeVue3 } from 'youtube-vue3'
  import { defineProps, withDefaults, nextTick, onMounted, ref } from 'vue';

  export interface Props{
    videoId: string;
    title: string;
    width?: number;
    height?: number;
    radius?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: 480,
    height: 320,
    radius: 60,
  })

  const videoLayer = ref();
  const onLayerClick = (event: Event) => {
    console.log(event, videoLayer.value);
    videoLayer.value.classList.remove('show');
    videoLayer.value.classList.add('hide');
    youTube.value.player.playVideo();
    setTimeout(() => videoLayer.value.style.display = 'none', 1000);
    youTube.value.player.unMute();
  }

  const onVideoClick = () => {
    console.log('videoclick');
    videoLayer.value.style.display = 'block';
    setTimeout(() => {
      videoLayer.value.classList.add('show');
      videoLayer.value.classList.remove('hide');
    }, 500)
    
  }

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
    overflow: hidden;

    .video-layer {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px;

      .transparent-text {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: 8px;
        transform: scale(1);
        transition: transform 1s;
        will-change: transform;

        &.show {
          transform: scale(1);
        }

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

      .play {
        
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          filter: invert(100%) sepia(0%) saturate(1%) hue-rotate(226deg) brightness(103%) contrast(101%);
          width: 50px;
        }
      }

      &.hide {
        .transparent-text {
          transform: scale(5);
        }
        .play {
          display: none;
        }
      }

    }

  }
</style>