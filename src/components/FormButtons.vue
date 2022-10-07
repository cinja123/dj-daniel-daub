<template>
  <div class="buttons">
    <FlipButton v-if="props.previous" class="button"
      icon="arrowLeft.svg"
      alt="Pfeil links"
      label="zurück"
      @click="emit('clickLeft')"
    ></FlipButton> 
    <FlipButton v-if="props.next" class="button"
      icon="arrowRight.svg"
      alt="Pfeil rechts"
      label="weiter"
      @click="emit('clickRight')"
    ></FlipButton>
    <FlipButton v-if="props.send" class="button"
      icon="paperPlane.svg"
      alt="senden"
      label="senden"
      @click="emit('clickSend')"
    ></FlipButton> 
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  import FlipButton from './FlipButton.vue';

  const props = defineProps<{
    previous?: boolean;
    next?: boolean;
    send?: boolean;
  }>()

  const emit = defineEmits<{
    (e: 'clickRight',): void;
    (e: 'clickLeft',): void;
    (e: 'clickSend',): void;
  }>()
</script>
<style scoped lang="scss">
  .buttons {
    display: flex;

    .button {
      flex-grow: 1;
    }
  
  }
</style>