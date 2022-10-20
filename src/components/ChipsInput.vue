<template>
  <div class="chips-input">
    <div class="example-chips">
      <ChipElement v-for="(option, index) in options" :key="`chip-${index}`"
        :selected="allSelected.includes(option[props.optionLabel])"
        :chip="option"
        :optionLabel="props.optionLabel"
        @chipClicked="updateSelected"
      ></ChipElement>
    </div>
    <Chips v-model="ownChips" separator="," :placeholder="props.placeholder" />
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, defineEmits, computed, ref } from 'vue';
  import ChipElement from '@/components/ChipElement.vue';

  const props = defineProps<{
    selected: any[];
    options: any[];
    optionLabel: string;
    placeholder?: string;
  }>()

  const emit = defineEmits<{
    (e: 'update:selected', newValue: any[]): void
  }>()

  const ownChips = ref();

  const updateSelected = (value: any, selected: boolean) => {
    let newSelected = props.selected || [];
    if (selected) {
      newSelected.push(value);
    } else {
      newSelected = newSelected.filter(obj => obj[props.optionLabel] !== value[props.optionLabel]);
    }
    emit('update:selected', newSelected)

  }

  const allSelected = computed(() => props.selected ? props.selected.map(el => el[props.optionLabel]) : []);
</script>
<style lang="scss" scoped>
  .chips-input {
    margin-bottom: 20px;
    .example-chips {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
</style>