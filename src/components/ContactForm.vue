<template>
  <article id="contact">
    <div class="contact-card">
      <div class="contact-header">
        <h3>Eventanfrage</h3>
        <ProgressSteps :items="props.items" :progress="currentPage"/>
      </div>
      <div class="contact-body">
        <Transition :name="`transition${transitionMove}`">
          <KeepAlive>
            <component :is="formInView" @onNextClick="changePage(1)" @onPrevClick="changePage(-1)" @onSend="submitForms" class="form-component"></component>
          </KeepAlive>
        </Transition>

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
  const formInView = shallowRef(props.items[0].component);
  const transitionMove = ref<'right'|'left'>('left');
  const changePage = (delta: -1|1) => {
    if((delta === 1 && currentPage.value < props.items.length) || (delta === -1 && currentPage.value > 0)){
      transitionMove.value = delta > 0 ? 'left' : 'right';
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
    min-height: 120vh;
    border: 1px solid green;
    display: flex;
    justify-content: center;

    .contact-card {
      border-radius: 8px;
      background-color: var(--main-text);
      color: var(--main-bg);
      margin: 15vh 0;
      width: calc(100vw - 44px);
      padding: 0 10px 5vh 10px;
      display: flex;
      flex-direction: column;
      overflow-x: clip;

      .contact-header {
        text-align: center;
        flex: 0 1 auto;
      }

      .contact-body {
        flex: 1 1 auto;
        position: relative;
        margin: 30px 0 0 0;

        .form-component {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
      }
    }
    
  }

  .transitionleft-enter-active,
  .transitionleft-leave-active,
  .transitionright-enter-active,
  .transitionright-leave-active {
    transition: all 0.5s ease;
  }

  .transitionleft-enter-from,
  .transitionleft-leave-to,
  .transitionright-enter-from,
  .transitionright-leave-to {
    &.form-component {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
  }

  .transitionright-enter-from{
    transform: translateX(-100vw);
  }
  .transitionright-leave-to {
    transform: translateX(100vw);
  }
  .transitionleft-enter-from{
    transform: translateX(100vw);
  }
  .transitionleft-leave-to {
    transform: translateX(-100vw);
  }
</style>