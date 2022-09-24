<template>
  <article id="about-me">
    <section class="description">
      <p>{{ hyphenatedDesc }}</p>
    </section>
    <section class="photo-grid">
      <span v-for="(img, picIndex) in props.photoGrid" :key="picIndex" 
        :style="`background-image: url('${require('@/assets/media/images/' + img)}')`"
      ></span>
      <!-- <img v-for="(img, index) in props.photoGrid" :key="index" :src="require('@/assets/media/images/' + img)" alt="Image Daniel" /> -->
    </section>
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
    border: 1px solid aquamarine;
    height: 100vh;
    padding: 80px 5% 5% 5%;
    position: relative;
    @media screen and (min-width: 800px) {
      padding: 80px 3% 3% 3%;
      display: flex;
    }

    .description {
      border: 1px dashed red;
      width: 100%;
      margin-bottom: 25vh;

      @media screen and (min-width: 550px) {
        margin-bottom: 50vh;
      }

      @media screen and (min-width: 800px) {
        margin: 0;
        width: 50%;
      }

      p{
        font-size: 1.3rem;
        line-height: 1.7rem;
        letter-spacing: 0.5px;
        margin: 0;
        text-align: justify;
        

        @media screen and (min-width: 1500px) {
          font-size: 1.5rem;
          line-height: 2rem;
          letter-spacing: 1px;
        }
      }
    }

    .photo-grid {
      border: 1px dashed red;
      width: 100%;
      height: 80vh;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(5, 1fr);
      grid-column-gap: 2px;
      grid-row-gap: 2px;

      @media screen and (min-width: 800px) {
        width: 50%;
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
</style>