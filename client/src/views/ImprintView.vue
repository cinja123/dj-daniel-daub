<template>
  
  <div ref="scrollSection" data-scroll-container>
    <router-link to="/">
      <FlipButton icon="arrowLeft.svg" label="Zurück"/>
    </router-link>

  <h2>Impressum</h2>
    <section id="basic-information" class="impressum">
      <h3>Angaben gemäß § 5 TMG:</h3>
      <ul>
        <li>Daniel Daub</li>
        <li>Ulmenstraße 3</li>
        <li>55291 Saulheim</li>
      </ul>
      <br>
      <h3>Kontakt:</h3>
      <ul>
        <li><span>Telefon:</span> <a href="tel:+491724890833">0172/4890833</a></li>
        <li><span>E-Mail:</span> <a href="mailto:info@herrdaub.de">info@herrdaub.de</a></li>
      </ul>
    </section>
    <br>
    <section id="disclaimer" class="impressum">
      <h3>Haftungsausschluss</h3>
      <section class="disclaimer content">
        <h4>Haftung für Inhalte</h4>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
            Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, 
            übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, 
            die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung 
            oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. 
            Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. 
            Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
      </section>
      <br>
      <section class="disclaimer links">
        <h4>Haftung für Links</h4>
        <p>Unser Angebot enthält Links zu externen Webseiten Dritter, 
          auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für 
          diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte 
          der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
          der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt 
          der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren 
          zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle 
          der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung 
          nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links 
          umgehend entfernen.</p>
      </section>
      <br>
      <section class="disclaimer copyright">
        <h4>Urheberrecht</h4>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der 
          Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des 
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, 
          nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, 
          werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. 
          Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden 
          Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
      </section>
      <br>
    </section>
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
.impressum li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.impressum {
  margin: 0 10%;
}
h2 {
  text-align: center;
}


</style>