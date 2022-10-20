<template>
  <div :class="`chip ${props.selected ? 'selected' : 'unselected'}`" @click="chipClicked(this.chip)">
    <span>{{ typeof props.chip === 'string' ? props.chip : props.optionLabel ? props.chip[props.optionLabel] : props.chip }}</span>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps<{
    selected: boolean;
    chip: Record<string, any> | string;
    optionLabel?: string;
  }>()

  const emit = defineEmits<{
    (e: 'chipClicked', value: any, selected: boolean): void
  }>()

  const chipClicked = (value: any) => {
    emit('chipClicked', JSON.parse(JSON.stringify(value)), !props.selected);
  }

</script>
<style lang="scss" scoped>
  .chip {
    border-radius: 8px;
    display: inline-block;
    border: 1px solid var(--main-bg);
    cursor: pointer;
    padding: 0.75rem;
    margin: 7px;
    color: var(--main-bg);
    background-color: var(--main-text);
    transition: all .3s all;

    &.selected {
      border: 1px solid var(--orange);
      color: var(--orange);
      background-color: rgba(255,140,0,0.1);
    }

    &:hover {
      color: var(--main-text);
      background-color: var(--main-bg);
    }
  }
</style>