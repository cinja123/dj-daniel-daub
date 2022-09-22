<template>
  <article id="about-me">
    <section class="description">
      <p>{{ props.description }}</p>
    </section>
    <section class="photo-grid">
      <img v-for="(img, index) in props.photoGrid" :key="index" :src="require('@/assets/media/images/' + img)" alt="Image Daniel" />
    </section>
  </article>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';

  const props = defineProps<{
    description: string;
    photoGrid: string[];
  }>()
</script>
<style lang="scss" scoped>
  #about-me {
    border: 1px solid green;
    min-height: 100vh;
    padding: 3%;
    display: flex;

    .description {
      width: 50%;

      p{
        font-size: 1.5rem;
        line-height: 2rem;
        letter-spacing: 1px;
        margin: 0;
      }
    }

    .photo-grid {
      width: 50%;
      height: 80vh;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(5, 1fr);
      grid-column-gap: 2px;
      grid-row-gap: 2px;

      img {
        width: 100%;

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