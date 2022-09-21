<template>
  <article ref="localeScrollContainer" id="landing" :data-scroll-container="props.scrollContainer">
    <section :style="props.scrollContainer ? 'min-height: 200vh;' : ''">
      <div data-scroll-section>
        <div class="pictures-wrap">
          <p v-for="(line, index) in linePictures" :key="index" 
            data-scroll :data-scroll-speed="index%2 === 0 ? 2 : -2" data-scroll-direction="horizontal"
          >
            <span v-for="(pic, picIndex) in line" :key="index + picIndex"
              :class="'picture-line-image line-' + index"  
              :style="`background-image: url('${require('@/assets/media/images/' + pic)}')`"
            ></span>
          </p>
        </div>
        <img v-if="props.logo" :src="require('@/assets/media/logos/' + props.logo)" alt="Logo" 
          data-scroll data-scroll-speed="5"
        />
      </div>
    </section>
    
    <slot name="content"></slot>    
  </article>
</template>
<script lang="ts" setup>
  import { defineProps, ref, onMounted, nextTick } from 'vue';
  import locomotiveScroll from 'locomotive-scroll';

  const props = defineProps<{
    pictures: string[];
    logo?: string;
    scrollContainer?: boolean;
  }>()

  const reOrderArray = (value:number, element: string[]): {line: string[], element: string[]}  => {
    //fill up to have at least same length
    if (element.length < value) {
      const difference = element.length + Math.ceil(value / element.length);
      for (let i = 0; i < difference; i++){
        element.push(element[i % element.length]);
      }
    }
    // get first #value elements
    const line = element.slice(0, 8);
    element = element.slice(8);
    element = element.concat(line);
    return {line: line, element: element};
  }

  const linePictures = ref<string[][]>([[], [], [], []])
  let pictures = [ ...props.pictures];
  const initPicLines = () => {
    for (let i = 0; i < linePictures.value.length; i++) {
      const result = reOrderArray(8, pictures);
      linePictures.value[i] = result.line;
      pictures = result.element;
    }
  }
  initPicLines();
  

  const localeScrollContainer = ref(null);
  const scroll = ref<locomotiveScroll>();
  const scrollIns = null; // eslint-disable-line

  const initLocoScroll = () => {
    scroll.value = new locomotiveScroll({
      el: localeScrollContainer.value,
      smooth: true,
      smoothMobile: true,
      getDirection: true,
    });
  }

  onMounted(() => {
    if (props.scrollContainer){
      nextTick(() => {initLocoScroll()})
    }
  })
</script>
<style lang="scss">

  #landing {
    min-height: 100vh;
    border: 1px solid green;
    overflow: hidden;
    

    > section {

      > div {
        position: relative;
        perspective: 1000px;

        .pictures-wrap {
          transform: translateX(-90%) translateY(-20vh) translateZ(-500px) rotateX(60deg) rotateZ(12deg);

          @media screen and (min-width: 450px) {
            transform: translateX(-90%) translateZ(-400px) rotateX(60deg) rotateZ(12deg);
          }

          @media screen and (min-width: 850px) {
            transform: translateX(-60%) translateZ(-500px) rotateX(72deg) rotateZ(12deg);
          }
          
          @media screen and (min-width: 1000px) {
            transform: translateX(-30%) translateY(10vh) translateZ(50px) rotateX(72deg) rotateZ(12deg);
          }
        
    
          p {
            white-space: nowrap;
            width: 200%; 
            margin: 0;
            
          }
          .picture-line-image {
            background-size: cover;
            outline: 1px solid transparent;
            display: inline-block;
            width: 200px;
            height: 200px;
            margin: 6px;
            opacity: 0.7;

            @media screen and (min-width: 400px) {
              width: 250px;
            }

            @media screen and (min-width: 600px) {
              width: 300px;
            }
          }
        }

        img {
          width: 40%;
          position: absolute;
          top: 38vh;
          left: 50%;
        }
      }
    }
  }
</style>