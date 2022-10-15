<template>
  <section class="event-form">
    <h4>Event</h4>
    <form action="">
      <div v-for="(item, index) in formItems" :key="index">
        <InputField 
          :type="item.type"
          :label="item.label"
          v-model:selected="eventData[item.selectedKey]"
          :options="item.options"
          :optionLabel="item.optionLabel"
          :placeholder="item.placeholder"
          :id="item.selectedKey"
        ></InputField>
        <p v-if="v$[item.selectedKey].$invalid || v$[item.selectedKey].$pending.$response">{{v$[item.selectedKey].required.$message.replace('Value', item.label.replaceAll('*', ''))}}</p>
      </div>
      
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
  import { defineEmits, reactive, ref } from 'vue';
  import FormButtons from '../FormButtons.vue';
  import * as eventFormData from '@/assets/data/eventFormData.json';
  import InputField from '@/components/InputField.vue';
  import { EventData, FormItem } from '@/models/FormModels';
  import { useVuelidate } from '@vuelidate/core';
  import { required } from '@vuelidate/validators';

  const emit = defineEmits<{
    (e: 'onNextClick',): void;
  }>()

  const occassions = ref<{name: string}[]>(eventFormData.occassions);
  const numbersGuests = ref<{displayName: string, value: number}[]>(eventFormData.numbersGuests);
  const durations = ref<{displayName: string, value: number}[]>(eventFormData.durations);
  const eventData = ref<EventData>(new EventData());

  const formItems: FormItem[] = [
    new FormItem('occassion', 'Anlass*', occassions.value, 'dropdown', 'Anlass auswählen', 'name'),
    new FormItem('date', 'Datum*', undefined, 'date'),
    new FormItem('numberGuests', 'Anzahl Gäste*', numbersGuests.value, 'dropdown', 'Anzahl Gäste auswählen', 'displayName'),
    new FormItem('duration','Musikdauer*', durations.value, 'dropdown', 'Musikdauer', 'displayName')
  ];

  const validationRules = {
    occassion: { required, $autoDirty: true },
    date: { required },
    numberGuests: { required },
    duration: { required },
  }

  const v$ = useVuelidate(validationRules, eventData);

  const validateData = (): boolean => {
    console.log('check event data', v$.value.occassion);
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