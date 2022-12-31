<template>
  
  <div ref="scrollSection" data-scroll-container>
    <router-link to="/">
      <FlipButton icon="arrowLeft.svg" label="Zurück"/>
    </router-link>

    <h2>Datenschutz:</h2>
    <p>
      Die Nutzung der Internetplattform <router-link to="/">www.herrdaub.de</router-link> ist grundsätzlich auch ohne Angabe personenbezogener Daten möglich. Soweit auf der Internetseite www.herrdaub.de personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich stets auf freiwilliger Basis. Diese Daten werden ohne ausdrückliche Zustimmung der User nicht an Dritte weitergegeben.
    </p>
    <br>
    <p>
      Die Datenübertragung im Internet (z.B bei der Kommunikation per E-Mail) kann Sicherheitslücken aufweisen. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. 
    </p>
  </div>
  
</template>
<script lang="ts" setup>
import FlipButton from '@/components/FlipButton.vue';
import { store } from '@/store';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import locomotiveScroll from 'locomotive-scroll';
console.log('store', store.visited)

const scrollSection = ref(null);
const scroll = ref<any>();
const scrollIns = null;

const initLocoScroll = () => {
  scroll.value = new locomotiveScroll({
    el: scrollSection.value,
    smooth: true,
    getDirection: true,
    smartphone: {
      breakpoint: 0,
      smooth: true,
      getDirection: true,
    },
    tablet: {
      breakpoint: 0,
      smooth: true,
      getDirection: true,
    },
  });
}

onMounted(() => {
    console.log('initscroll');
    store.visitLandingPage();
    initLocoScroll();
})
</script>
<style scoped>

div {
  margin: 0 10%;
}
h2 {
  text-align: center;
}


</style>