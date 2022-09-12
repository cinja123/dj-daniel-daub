<template>
  <div class="contact-box-container">
    <img class="icon" :alt="props.alt ? props.alt : 'icon'" :src="require(`../assets/media/icons/${props.icon}`)" />
    <div>
      <slot name="text"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { defineProps } from 'vue';

  const props = defineProps<{
    icon: string;
    alt?: string;
  }>();
</script>
<style lang="scss" scoped>
.contact-box-container {
  text-align: center;
  margin: 5px 0;
}
</style>