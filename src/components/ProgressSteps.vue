<template>
  <section class="steps-container">
    <div class="line todo"></div>
    <div class="line done" :style="`width: ${props.progress * progressFactor}%`"></div>
    <div class="progress-icons">
      <div class="img-container" v-for="(item, index) in props.items" :key="item.label">
        <img :class="index < props.progress ? 'iconBG color-orange' : ''" alt="icon" :src="require(`../assets/media/icons/${item.icon}`)"/>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
  import { computed, defineProps } from 'vue';

  const props = defineProps<{
    items: {label: string, icon: string}[];
    progress: number;
  }>()

  const progressFactor = computed(() => props.items.length !== 1 ? 100 / (props.items.length - 1) : 0);

</script>
<style lang="scss" scoped>
.steps-container {
  position: relative;
  .line {
    position: absolute;
    top: 50%;

    &.todo{
      width: 100%;
      border-top: 2px solid var(--main-bg);
    }
    &.done {
      border-top: 2px solid var(--orange);
    }
    
  }

  .progress-icons {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .img-container {
      width: 14%;
      max-width: 42px;
      background-color: var(--main-text);
      padding: 0 2%;
      z-index: 10;

      img{
        width: 100%;
      }
    
    }
  }
}
</style>