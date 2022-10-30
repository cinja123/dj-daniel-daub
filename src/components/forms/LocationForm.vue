<template>
  <section class="location-form">
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
    <FormButtons :next="true" :previous="true" @clickRight="nextPage" @clickLeft="emit('onPrevClick')" class="buttons"></FormButtons>
  </section>
</template>
<script lang="ts" setup>
  import FormButtons from '../FormButtons.vue';
  import InputField from '@/components/InputField.vue';
  import { defineEmits, ref } from 'vue';
  import { LocationData, FormItem } from '@/models/FormModels';
  import * as locationFormData from '@/assets/data/locationFormData.json';
  import { useVuelidate } from '@vuelidate/core';
  import { required, helpers, minLength, maxLength } from '@vuelidate/validators';

  const emit = defineEmits<{
    (e: 'onNextClick', formData: LocationData): void;
    (e: 'onPrevClick',): void;
  }>()

  const technologies = ref(locationFormData.eventTechnology);

  const locationData = ref<LocationData>(new LocationData());

  const formItems: FormItem[] = [
    new FormItem('locationName', 'Locationname*', undefined, 'text', 'Name der Location', undefined),
    new FormItem('zipCode', 'Postleitzahl*', undefined, 'zip', 'PLZ der Location', undefined),
    new FormItem('city', 'Ort*', undefined, 'text', 'Ort der Location', undefined),
    new FormItem('eventTechnology', 'Veranstaltungstechnik', technologies.value, 'selectbutton', undefined, 'name')
  ];

  const validationRules = {
    locationName: { required: helpers.withMessage('Name der Location', required) },
    zipCode: { required: helpers.withMessage('Postleitzahl der Location', required), 
      minLength: helpers.withMessage('5 Ziffern', minLength(5)),
      maxLength: helpers.withMessage('5 Ziffern', maxLength(5))
    },
    city: { required: helpers.withMessage('Ort der Location', required) },
    eventTechnology: { required: helpers.withMessage('Technologie in Location?', required) }
  }

  const v$ = useVuelidate(validationRules, locationData);

  const validated = ref(false);
  const nextPage = async() => {
    validated.value = true;
    const isFormValid = await v$.value.$validate();
    if (isFormValid) {
      emit('onNextClick', locationData.value);
    }
  }
 
</script>
<style lang="scss" scoped>
.location-form {

  .buttons {
    width: 100%;
  }

  .error-message{
    margin: 0;
  }
}
</style>