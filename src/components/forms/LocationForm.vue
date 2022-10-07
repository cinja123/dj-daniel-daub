<template>
  <section class="location-form">
    <h4>Location</h4>
    <FormButtons :next="true" :previous="true" @clickRight="nextPage" @clickLeft="emit('onPrevClick')" class="buttons"></FormButtons>
  </section>
</template>
<script lang="ts" setup>
  import FormButtons from '../FormButtons.vue';
  import { defineEmits } from 'vue';

  const emit = defineEmits<{
    (e: 'onNextClick',): void;
    (e: 'onPrevClick',): void;
  }>()

  const validateData = (): boolean => {
    return true;
  }

  const nextPage = () => {
    if (validateData()) {
      emit('onNextClick');
    }
  }
 
</script>
<style lang="scss" scoped>
.location-form {
  position: relative;

  .buttons {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>