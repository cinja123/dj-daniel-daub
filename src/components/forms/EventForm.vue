<template>
  <section class="event-form">
    <h4>Event</h4>
    <FormButtons :next="true" @clickRight="nextPage"></FormButtons>
  </section>
</template>
<script lang="ts" setup>
  import { defineEmits } from 'vue';
  import FormButtons from '../FormButtons.vue';

  const emit = defineEmits<{
    (e: 'onNextClick',): void;
  }>()

  const validateData = (): boolean => {
    console.log('check event data');
    return true
  }

  const nextPage = () => {
    if (validateData()) {
      emit('onNextClick');
    }
  }
</script>
<style lang="scss" scoped>

</style>