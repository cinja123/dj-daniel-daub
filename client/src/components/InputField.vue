<template>
  <div class="input-field">
    <label v-if="props.label" :for="props.id">{{props.label}}:</label>
    <Dropdown v-if="props.type === 'dropdown'" class="dropdown" appendTo="self"
      :id="props.id" 
      v-model="selected" 
      :options="props.options" 
      :optionLabel="props.optionLabel" 
      :placeholder="props.placeholder||''"
      scrollHeight="400px"
    />
    <input v-else-if="props.type === 'date' && props.options" :id="props.id" :class="props.selected === undefined || props.selected === '' ? 'placeholder' : ''" type="date" :name="props.label" v-model="selected" :min="tomorrow.toISOString().split('T')[0]">
    <ChipsInput v-else-if="props.type === 'chips'"
      v-model:selected="selected"
      :id="props.id" 
      :options="props.options!"
      :optionLabel="props.optionLabel || ''"
      placeholder="weitere..."
    ></ChipsInput>
    <InputText v-else-if="props.type === 'text'" :id="props.id"  type="text" v-model="selected" :placeholder="props?.placeholder"/>
    <InputMask v-else-if="props.type === 'zip'" :id="props.id" v-model="selected" mask="99999" :placeholder="props.placeholder" />
    <SelectButton v-else-if="props.type === 'selectbutton'" v-model="selected" :options="props.options" :optionLabel="props.optionLabel" :unselectable="false" />
    <Textarea v-else-if="props.type === 'textarea'" class="textarea" v-model="selected" :autoResize="true" rows="5" :placeholder="props?.placeholder" />
    <div v-else></div>
    <div class="error">
      <slot name="errorMessage"></slot>
    </div>
  </div>

</template>
<script lang="ts" setup>
  import { defineProps, defineEmits, computed, ref } from 'vue';
  import ChipsInput from '@/components/ChipsInput.vue';

  const emit = defineEmits<{
    (e: 'update:selected', newValue: any): void
  }>()

  const props = defineProps<{
    type: string //'dropdown' | 'date' | 'text' | 'chips' | 'zip' | 'selectbutton' | 'textarea';
    label?: string;
    selected?: any | any[];
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
      emit('update:selected', newValue);
    }
  })
</script>
<style lang="scss" scoped>
@import 'primeicons/primeicons.css';

  .input-field{
    margin-bottom: 10px;

    &.invalid{
      .error {
        visibility: visible;
        color: var(--error);
        font-size: 0.75rem;
        margin: 0;
      }
      label {
        color: var(--error);
      }
    }

    label {
      margin: 0;
      display: block;
      color: var(--main-bg);
    }
    .dropdown, .date-picker {
      width: 100%;
    }

    .textarea {
      width: calc(100% - 1.5rem);
    }

    input {
      border: none;
      border-bottom: 1px solid #ced4da;
    }
    .textarea {
      border: 1px solid #ced4da;
      cursor: alias;
    }
    input, .textarea {
      padding: 0.75rem;
      width: calc(100% - 1.5rem);
      font-family: "Montserrat", Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-size: inherit;
      
      &.placeholder {
        color: #6c757d;
      }
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

    .error {
      visibility: hidden;
    }

  }
  

</style>