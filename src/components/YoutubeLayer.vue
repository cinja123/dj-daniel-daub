<template>  
  <section ref="videoWrapper" class="video-wrapper">
    <YoutubeVue3 ref="youTube" :key="youTubeKey" 
      :videoid="props.videoId" 
      :loop="1" :autoplay="0"
      :controls="1" 
      :width="props.width" 
      :height="props.height" 
      @paused="onVideoClick"
    />
    <div ref="videoLayer" class="video-layer show" @click="onLayerClick">
      <svg class="transparent-text" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${props.width} ${props.height}`"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask :id="`maskvideo-${props.videoId}`" x="0" y="0" width="100%" heigth="100%">
            <rect class="maskRect" x="0" y="0" width="100%" height="100%"></rect>
            <text class="video" x="50%" :y="props.height - 50" dominant-baseline="start" text-anchor="middle">
              {{props.title}}
            </text>
            <circle cx="50%" cy="50%" :r="props.radius" fill="black"></circle>
          </mask>
        </defs>
        <rect ref="maskContainer" class="video" x="0" y="0" width="100%" height="100%"></rect>
      </svg>
      <div class="play">
        <img :src="require('@/assets/media/icons/play.svg')" :style="`width: ${props.radius * 0.6}px;`" alt="Play" />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
  import { YoutubeVue3 } from 'youtube-vue3'
  import { defineProps, withDefaults, nextTick, onMounted, ref, watch } from 'vue';

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
    radius: 80,
  })

  const youTubeKey = ref(0);
  watch(() => props.width, () => {
    console.log('New video width', props.width);
    youTube.value.player.setSize(props.width, props.height);
  });

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

  const maskContainer = ref();
  const youTube = ref()
  onMounted(() => {
    nextTick(() => {
      maskContainer.value.style.mask = `url(#maskvideo-${props.videoId})`
      youTube.value.player.mute();
      youTube.value.player.playVideo();
    })
  })

  onMounted(() => nextTick(() => {
    youTube.value.player.setSize(props.width, props.height);
  }))

</script>
<style lang="scss" scoped>
  .video-wrapper {
    display: inline-block;
    position: relative;
    overflow: hidden;
    text-align: center;
    border-radius: 10px;

    .video-layer {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;

      .transparent-text {
        //width: 100%;
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        //height: 100%;
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