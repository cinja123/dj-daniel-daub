<template>
  <section class="steps-container">

  </section>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';

  const props = defineProps<{
    items: {label: string, to: string}[];
  }>()

</script>
<style lang="scss" scoped>

</style>