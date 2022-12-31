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
    <Chips v-model="ownChips" separator="," :placeholder="props.placeholder" @add="updateChips" @remove="removeCustomChip"/>
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

  const getAllSelectedChips = () => {
    let allSelected: any[] = [];
    const selected = props.selected || [];
    props.options.forEach(option => {
      if(selected.find(selectedObj => selectedObj.value === option.value)) {
        allSelected.push(option);
      }
    })
    return allSelected
  }

  const removeCustomChip = (removedChip: any) => {
    let allSelected = props.selected;
    const index = allSelected.findIndex((selected) => selected.value === removedChip.value[0]);
    allSelected.splice(index, 1);
    emit('update:selected', allSelected);
  }

  const updateChips = (newChips: Record<string, any>) => {
    let allSelected = getAllSelectedChips();
    newChips.value.forEach((customerChip: string) => {
      allSelected.push({
        displayName: customerChip,
        value: customerChip
      })
    });
    emit('update:selected', allSelected);
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