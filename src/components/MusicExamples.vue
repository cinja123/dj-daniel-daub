<template>
  <article id="music">
    <h3>Music</h3>
    <div v-for="video, index in props.videoIds" :key="index">
      <YoutubeVue3 :ref="`video${index}`" :videoid="video" :loop="1" :width="480" :height="320"/>
    </div>
  </article>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';
  import { YoutubeVue3 } from 'youtube-vue3'

  const props = defineProps<{
    videoIds: string[];
  }>()

</script>
<style lang="scss" scoped>
  #music {
    border: 1px solid green;
    min-height: 100vh;
  }
</style>