<template>
  <section class="event-form">
    <form action="">
      <div v-for="(item, index) in formItems" :key="index">
        <InputField 
          :class="(v$[item.selectedKey].$invalid || v$[item.selectedKey].$pending) && validated ? 'invalid' : ''"
          :type="item.type"
          :label="item.label"
          v-model:selected="v$[item.selectedKey].$model"
          :options="item.options"
          :optionLabel="item.optionLabel"
          :placeholder="item.placeholder"
          :id="item.selectedKey"
        >
          <template #errorMessage>
            <p class="error-message">{{v$[item.selectedKey]?.$silentErrors?.length > 0 ? v$[item.selectedKey].$silentErrors[0].$message : 'no' }}</p>
          </template>
        </InputField>
      </div>
    </form>
    <FormButtons class="buttons" :next="true" @clickRight="nextPage"></FormButtons>
  </section>
</template>
<script lang="ts" setup>
  import { defineEmits, ref } from 'vue';
  import FormButtons from '../FormButtons.vue';
  import * as eventFormData from '@/assets/data/eventFormData.json';
  import InputField from '@/components/InputField.vue';
  import { EventData, FormItem } from '@/models/FormModels';
  import { useVuelidate } from '@vuelidate/core';
  import { required, helpers } from '@vuelidate/validators';

  const emit = defineEmits<{
    (e: 'onNextClick', formData: EventData): void;
  }>()

  const occassions = ref<{name: string}[]>(eventFormData.occassions);
  const numbersGuests = ref<{displayName: string, value: number}[]>(eventFormData.numbersGuests);
  const durations = ref<{displayName: string, value: number}[]>(eventFormData.durations);
  const genres = ref<{displayName: string, value: string}[]>(eventFormData.musicGenres);
  const eventData = ref<EventData>(new EventData());

  const formItems: FormItem[] = [
    new FormItem('occassion', 'Anlass*', occassions.value, 'dropdown', 'Anlass auswählen', 'name'),
    new FormItem('date', 'Datum*', undefined, 'date'),
    new FormItem('numberGuests', 'Anzahl Gäste*', numbersGuests.value, 'dropdown', 'Anzahl Gäste auswählen', 'displayName'),
    new FormItem('duration','Musikdauer*', durations.value, 'dropdown', 'Musikdauer', 'displayName'),
    new FormItem('music', 'Musikgenre', genres.value, 'chips', undefined, 'displayName')
  ];

  const minDateVal = (newDate: string) => newDate > new Date().toISOString();

  const validationRules = {
    occassion: { required: helpers.withMessage('Anlass auswählen', required) },
    date: { required: helpers.withMessage('Datum auswählen', required), minDateVal: helpers.withMessage('Datum liegt in Vergangenheit', minDateVal) },
    numberGuests: { required: helpers.withMessage('Anzahl Gäste auswählen', required) },
    duration: { required: helpers.withMessage('Dauer auswählen', required) },
    music: {}
  }

  const v$ = useVuelidate(validationRules, eventData);
 
  const validated = ref(false);
  const nextPage = async() => {
    validated.value = true;
    const isFormValid = await v$.value.$validate();
    if (isFormValid) {
      emit('onNextClick', eventData.value);
    }
  }
</script>
<style lang="scss" scoped>
  .event-form {

    .buttons {
      width: 100%;
    }

    .error-message{
      margin: 0;
    }
  }
</style>