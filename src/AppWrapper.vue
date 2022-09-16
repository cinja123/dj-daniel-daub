<template>
  <header></header>
  <main></main>
  <flip-button
    icon="facebook.svg"
    label="Test"
    @buttonClick="onButtonClick"
  />
  <app-footer/>
</template>
<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import FlipButton from './components/FlipButton.vue';

const onButtonClick = (event: Event) => {
  console.log(event);
}

</script>
<style lang="scss" scoped>

</style>
