<template>
  <article id="about-me">
    <div id="about-wrapper" data-scroll-speed="0" data-scroll >
      <section class="description" data-scroll data-scroll-sticky data-scroll-target="#about-wrapper" data-scroll-direction="vertical">
        <p >{{ hyphenatedDesc }}</p>
      </section>
      <section class="photo-grid" data-scroll data-scroll-speed="20" data-scroll-direction="horizontal">
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
    hyphenatedDesc.value = result;
  })

</script>
<style lang="scss" scoped>
  #about-me {
    border: 1px solid green;
    padding-bottom: 20vh;
    

    #about-wrapper {
      //background-color: rgba(100, 100, 100, 0.6);
      position: relative;
      padding-bottom: 20vh;
      @media screen and (min-width: 800px){
        display: flex;
      }

      section {
        //border: 1px dashed red;
        
        @media screen and (min-width: 800px){
          width: 50vw;
        }
      }
  
      .description {
        height: fit-content;
  
        @media screen and (min-width: 800px) {
          margin: 0;
        }
  
        p{
          font-size: 1rem;
          line-height: 1.2rem;
          letter-spacing: 0.2px;
          margin: 0;
          text-align: justify;
          width: 96%;
          padding: 80px 2% 0 2%;

          @media screen and (min-width: 800px) {
            font-size: 1.3rem;
            line-height: 1.7rem;
            letter-spacing: 0.5px;
          }
          
          @media screen and (min-width: 1500px) {
            font-size: 1.5rem;
            line-height: 2rem;
            letter-spacing: 1px;
          }
        }
      }
  
      .photo-grid {
        height: 80vh;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 2px;
        grid-row-gap: 2px;
        position: absolute;
        width: 96vw;
        top: 0vh;
        left: -60vw;
  
        @media screen and (min-width: 800px) {
          padding-left: 2%;
          align-self: flex-end;
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