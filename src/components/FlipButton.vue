<template>
  <button :class="`flip-btn ${props.class}`" type="button" @click="onButtonClick($event)">
    <span class="flip-btn-front"
      :style="`
        color: ${props.styleFront?.color};
        font-size: ${props.styleFront?.fontSize};
        font-weight: ${props.styleFront?.fontWeight};
      `"
    >
      {{ props.label }}
    </span> 
    <img :class="`icon iconBG ${props.styleBack?.color||'color-orange'} flip-btn-back`" 
      :alt="props.alt || props.label" 
      :src="require(`../assets/media/icons/${props.icon}`)" 
    />
  </button>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['buttonClick'])

/**
 * icon: name of icon file
 * label: display name of front button
 * styleFront: change style of front button
 * styleBack: change style of back button
*/
const props = defineProps<{
  icon: string;
  alt?: string;
  label: string;
  styleFront?: {
    border?: string,
    color?: string,
    fontSize?: string,
    fontWeight?: string,
  };
  styleBack?: {
    color?: string,
  }
  class?: string,
}>();

const onButtonClick = (event: Event) => {
  emit('buttonClick', event);
}
</script>
<style lang="scss" scoped>
.flip-btn {
  position: relative;
  z-index: 20;
  padding: 0 8px;
  border: 2px solid var(--main-text);
  border-radius: 5px;
  display: inline-block;
  height: 30px;
  min-width: 135px;
  background-color: var(--main-bg);
  cursor: pointer;
  font-size: 100%;
  text-align: center;

  .flip-btn-front {
    color: var(--main-text);
    transform: translateY(0) rotateX(0);
    opacity: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    transition: all 0.4s ease;
  }

  .flip-btn-back {
    position: absolute;
    top: 3px;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    opacity: 0;
    transform: translateY(-50%) rotateX(-90deg);
    transition: all 0.4s ease;
  }

  &:hover {
    border: 2px solid var(--orange);

    .flip-btn-front {
      transform: translateY(50%) rotateX(90deg);
      opacity: 0;
    }
    .flip-btn-back {
      opacity: 1;
      transform: translateY(0) rotateX(0);
    }
  }
  
}
</style>