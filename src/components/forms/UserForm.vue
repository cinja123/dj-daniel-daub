<template>
  <section class="user-form">
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
    <FormButtons :previous="true" :send="true" @clickLeft="emit('onPrevClick')" @clickSend="send()" class="buttons"></FormButtons>
  </section>
</template>
<script lang="ts" setup>
  import FormButtons from '../FormButtons.vue';
  import InputField from '@/components/InputField.vue';
  import { defineEmits, ref } from 'vue';
  import { UserData, FormItem } from '@/models/FormModels';
  import useVuelidate from '@vuelidate/core';
  import { email, helpers, required } from '@vuelidate/validators';

  const emit = defineEmits<{
    (e: 'onSend', data: UserData): void;
    (e: 'onPrevClick',): void;
  }>()

  const userData = ref<UserData>(new UserData('', '', '', ''));

  const formItems: FormItem[] = [
    new FormItem('firstname', 'Vorname*', undefined, 'text', '', undefined),
    new FormItem('lastname', 'Nachname*', undefined, 'text', '', undefined),
    new FormItem('email', 'E-Mail*', undefined, 'text', '', undefined),
    new FormItem('phone', 'Telefon*', undefined, 'text', '', undefined),
    new FormItem('information', undefined, undefined, 'textarea', 'weitere Informationen ...', undefined)
  ];

  const validationRules = {
    firstname: { required: helpers.withMessage('Vorname eingeben', required) },
    lastname: { required: helpers.withMessage('Nachname eingeben', required) },
    email: { required: helpers.withMessage('E-Mail eingeben', required),
      email: helpers.withMessage('Keine gültige E-Mail', email)
    },
    phone: { required: helpers.withMessage('Telefonnummer eingeben', required) },
    information: {}
  }

  const v$ = useVuelidate(validationRules, userData);

  const validated = ref(false);
  const send = async() => {
    validated.value = true;
    const isFormValid = await v$.value.$validate();
    if (isFormValid) {
      emit('onSend', userData.value);
    }
  }

 
</script>
<style lang="scss" scoped>
.user-form {
  position: relative;

  .buttons {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}

</style>