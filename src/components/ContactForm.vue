<template>
  <article id="contact">
    <div class="contact-card">
      <div class="contact-header">
        <h3>Eventanfrage</h3>
        <!-- <ProgressSteps :items="props.items"/> -->
      </div>
      <div class="contact-body">
        <KeepAlive>
          <component :is="formInView" @onNextClick="changePage(1)" @onPrevClick="changePage(-1)" @onSend="submitForms"></component>
        </KeepAlive>

      </div>
    </div>
  </article>
</template>
<script lang="ts" setup>
  import { defineProps, shallowRef, ref } from 'vue';
  import ProgressSteps from './ProgressSteps.vue';

  const props = defineProps<{
    items: {label: string, component: any, icon: string}[];
  }>()

  const currentPage = ref(0);
  const formInView = shallowRef(props.items[0].component)
  const changePage = (delta: -1|1) => {
    if((delta === 1 && currentPage.value < props.items.length) || (delta === -1 && currentPage.value > 0)){
      currentPage.value += delta;
      formInView.value = props.items[currentPage.value].component;
    }
  }

  const submitForms = () => {
    console.log('send Form');
  }


</script>
<style lang="scss" scoped>
  #contact {
    min-height: 100vh;
    border: 1px solid green;
    display: flex;
    justify-content: center;

    .contact-card {
      border-radius: 8px;
      background-color: var(--main-text);
      color: var(--main-bg);
      margin: 10vh 0;
      min-width: calc(100vw - 24px);

      h3 {
        text-align: center;
      }
    }
    
  }
</style>