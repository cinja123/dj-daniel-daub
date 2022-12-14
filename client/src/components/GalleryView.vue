<template>
  <article id="gallery">
    <div class="gallery-img-container">
      <div v-for="(pictures, index) in props.pictures" :key="`${index}-pictures`" class="gallery-line"
        data-scroll :data-scroll-speed="index%2 === 0 ? 1 : -1"
      >
        <img v-for="(pic, picIndex) in pictures" :key="`${index}-${picIndex}`" 
          class="gallery-img"
          :src="require('@/assets/media/images/' + pic.name)"
          :alt="pic.alt"
        />
      </div>
    </div>
  </article>
</template>
<script lang="ts" setup>
  import { defineProps, defineEmits, onMounted, nextTick } from 'vue';
  import { Picture } from '@/models/PictureModel';

  const props = defineProps<{
    pictures: Picture[][];
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
  #gallery {
    min-height: 140vh;
    margin: 20vh 0;
    overflow-x: hidden;

    .gallery-img-container {
      display: flex;
      flex-wrap: wrap;


      .gallery-line {
        margin: 0 4px;
        width: calc(50% - 8px);
        &:nth-child(1), &:nth-child(4) {
          display: none;
        }
        @media screen and (min-width: 600px) {
          width: calc(33% - 8px);
          &:nth-child(1) {
            display: block;
          }
        }

        @media screen and (min-width: 1000px) {
          width: calc(25% - 8px);
          &:nth-child(4) {
            display: block;
          }
        }

        .gallery-img {
          -o-object-fit: cover;
             object-fit: cover;
          width: 100%;
          height: 45vh;
          margin: 2px 0;
        }
      }
    }
  }
</style>