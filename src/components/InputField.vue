<template>
  <div>
    <label :for="props.id">{{props.label}}:</label>
    <Dropdown v-if="props.type === 'dropdown'" class="dropdown" 
      :id="props.id" 
      v-model="selected" 
      :options="props.options" 
      :optionLabel="props.optionLabel||null" 
      :placeholder="props.placeholder||''"
      scrollHeight="400px"
    />
    <!-- <Calendar v-if="props.type === 'date'" class="date-picker" v-model="selected" appendTo="self" dateFormat="dd.mm.y" :showTime="false" :minDate="tomorrow" :placeholder="props.placeholder||''" /> -->
    <input v-if="props.type === 'date'" type="date" :id="props.label" :name="props.label" v-model="selected" :min="tomorrow.toISOString().split('T')[0]">
  </div>

</template>
<script lang="ts" setup>
  import { defineProps, defineEmits, computed, ref } from 'vue';

  const emit = defineEmits<{
    (e: 'update:selected', newValue: any): void
  }>()

  const props = defineProps<{
    type: 'dropdown' | 'date' | 'text';
    label: string;
    selected?: any;
    options?: any[];
    optionLabel?: string;
    placeholder?: string;
    id?: string;
  }>()

  const today = new Date();
  const tomorrow = ref<Date>(new Date(today.setDate(today.getDate() + 1)));

  const selected = computed({
    get: () => {
      return props.selected;
    },
    set: (newValue) => {
      console.log('update', newValue);
      emit('update:selected', newValue);
    }
  })
</script>
<style lang="scss" scoped>
@import 'primeicons/primeicons.css';

  label {
    margin: 5px 0;
    display: block;
  }
  .dropdown, .date-picker {
    width: 100%;
  }

  input {
    padding: 0.75rem;
    width: calc(100% - 1.5rem);
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: inherit;
    border: none;
    border-bottom: 1px solid #ced4da;
    &:hover {
      border-color: var(--orange);
      cursor: pointer;
    }
    &:focus{
      outline: 0 none;
      outline-offset: 0;
      box-shadow: 0 0 0 0.2rem rgba(255,140,0,0.29);
      border-color: var(--orange);
    }
  }
  

</style>