<template>
  <article id="about-me">
    <div id="about-wrapper">
      <section class="description">
        <p data-scroll data-scroll-sticky data-scroll-target="#about-wrapper">{{ hyphenatedDesc }}</p>
      </section>
      <section class="photo-grid" data-scroll data-scroll-speed="5">
        <span v-for="(img, picIndex) in props.photoGrid" :key="picIndex" 
          :style="`background-image: url('${require('@/assets/media/images/' + img)}')`"
        ></span>
      </section>
    </div>
  </article>
</template>
<script lang="ts" setup>
  import { defineProps, ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
  import { hyphenate } from 'hyphen/de-1996';

  const props = defineProps<{
    description: string;
    photoGrid: string[];
  }>()

  const hyphenatedDesc = ref('');
  hyphenate(props.description).then((result: string) => {
    console.log(result);
    hyphenatedDesc.value = result;
  })

  const picGridScroll = ref('vertical')
  const checkWidth = () => {
    picGridScroll.value =  window.innerWidth > 800 ? 'vertical' : 'horizontal'
  }
  onMounted(() => {
    checkWidth()
    nextTick(() => {
      window.addEventListener('resize', checkWidth);
    })
  })
  onBeforeUnmount(() => window.removeEventListener('resize', checkWidth))
</script>
<style lang="scss" scoped>
  #about-me {
    border: 1px solid green;
    padding-bottom: 80vh;
    display: flex;
    

    #about-wrapper {
      background-color: rgba(100, 100, 100, 0.6);
      height: 150vh;
      display: flex;

      section {
        width: 50vw;
        position: relative;
      }
  
      .description {
        border: 1px dashed red;
        height: fit-content;
  
        @media screen and (min-width: 800px) {
          margin: 0;
        }
  
        p{
          position: relative;
          font-size: 1.3rem;
          line-height: 1.7rem;
          letter-spacing: 0.5px;
          margin: 0;
          text-align: justify;
          width: 95%;
          padding-top: 50px;
          
  
          @media screen and (min-width: 1500px) {
            font-size: 1.5rem;
            line-height: 2rem;
            letter-spacing: 1px;
          }
        }
      }
  
      .photo-grid {
        border: 1px dashed red;
        height: 80vh;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 2px;
        grid-row-gap: 2px;
        align-self: flex-end;
  
        @media screen and (min-width: 800px) {
          padding-left: 2%;
        }
  
        span {
          width: 100%;
          background-size: cover;
          border-radius: 5px;
  
          &:nth-child(1) {
            grid-area: 1 / 1 / 4 / 2; 
          }
          &:nth-child(2) {
            grid-area:  4 / 1 / 6 / 2;; 
          }
          &:nth-child(3) {
            grid-area: 1 / 2 / 3 / 3; 
          }
          &:nth-child(4) {
            grid-area: 3 / 2 / 6 / 3; 
          }
        }
      }
    }
  }
</style>