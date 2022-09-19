<template>
  <article id="landing" ref="scrollSection">
      <section class="picture-container" data-scroll-container>
        <div data-scroll-section>
          <p v-for="(line, index) in linePictures" :key="index" data-scroll
            :data-scroll-speed="index%2 === 0 ? 2 : -2" data-scroll-direction="horizontal"
          >
            <span v-for="(pic, picIndex) in line" :key="index + picIndex"
              :class="'picture-line-image line-' + index"  
              :style="`background-image: url('${require('@/assets/media/images/' + pic)}')`"
            ></span>
          </p>
        </div>
        
      </section>



    <!-- <div  style="min-height: 200vh">
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
    </div> -->
  </article>
</template>
<script lang="ts" setup>
  import { defineProps, ref, onMounted, nextTick } from 'vue';
  import locomotiveScroll from 'locomotive-scroll';

  const props = defineProps<{
    pictures: string[];
    logo?: string;
  }>()

  const reOrderArray = (value:number, element: string[]): {line: string[], element: string[]}  => {
    //fill up to have at least same length
    if (element.length < value) {
      const difference = element.length + Math.ceil(value / element.length);
      console.log('differnce', difference);
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
  

  const scrollSection = ref(null);
  const scroll = ref<locomotiveScroll>();
  const scrollIns = null; // eslint-disable-line

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
<style lang="scss">
  #landing {
    min-height: 100vh;
  }
  .picture-container {
    width: 200%;


    .picture-line-image {
      background-size: cover;
      outline: 1px solid transparent;
      display: inline-block;
      width: 15%;
      height: 200px;

    }
  }
</style>