<template>
  <section class="event-form">
    <h4>Event</h4>
    <form action="">
      <InputField v-for="(item, index) in formItems" :key="index"
        :type="item.type"
        :label="item.label"
        v-model:selected="eventData[item.selectedKey]"
        :options="item.options"
        :optionLabel="item.optionLabel"
        :placeholder="item.placeholder"
      ></InputField>
      <!-- <InputField
        type="date"
        label="Datum*"
        v-model:selected=""
        placeholder="DD.MM.YY"
      ></InputField> -->
    </form>
    <FormButtons class="buttons" :next="true" @clickRight="nextPage"></FormButtons>
  </section>
</template>
<script lang="ts" setup>
  import { defineEmits, ref } from 'vue';
  import FormButtons from '../FormButtons.vue';
  import * as eventFormData from '@/assets/data/eventFormData.json';
  import InputField from '@/components/InputField.vue';
  import { EventData, FormItem } from '@/models/FormModels'

  const emit = defineEmits<{
    (e: 'onNextClick',): void;
  }>()

  const occassions = ref<{name: string}[]>(eventFormData.occassions);
  const numbersGuests = ref<{displayName: string, value: number}[]>(eventFormData.numbersGuests);
  const durations = ref<{displayName: string, value: number}[]>(eventFormData.durations);
  const eventData = ref<EventData>(new EventData());
  // const occassion = ref<{name: string}>();
  const formItems: FormItem[] = [
    new FormItem('occassion', 'Anlass*', occassions.value, 'dropdown', 'Anlass auswählen', 'name'),
    new FormItem('date', 'Datum*', undefined, 'date'),
    new FormItem('numberGuests', 'Anzahl Gäste*', numbersGuests.value, 'dropdown', 'Anzahl Gäste auswählen', 'displayName'),
    new FormItem('duration','Musikdauer*', durations.value, 'dropdown', 'Musikdauer', 'displayName')
  ];

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
  .event-form {
    position: relative;

    .buttons {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
</style>