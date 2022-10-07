<template>
  <section class="user-form">
    <h4>User</h4>
    <FormButtons :previous="true" :send="true" @clickLeft="emit('onPrevClick')" @clickSend="send()"></FormButtons>
  </section>
</template>
<script lang="ts" setup>
  import FormButtons from '../FormButtons.vue';
  import { defineEmits } from 'vue';

  const emit = defineEmits<{
    (e: 'onSend',): void;
    (e: 'onPrevClick',): void;
  }>()

  const validateData = (): boolean => {
    return true;
  }

  const send = () => {
    if(validateData()) {
      emit('onSend');
    }
  } 
 
</script>
<style lang="scss" scoped>

</style>