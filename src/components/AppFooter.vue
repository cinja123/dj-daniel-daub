<template>
  <footer>
    <article>
      <section class="follow-me">
        <h3>Follow Me on</h3>
        <ul>
          <li v-for="(contact, key) in contacts" :key="key">
            <IconLink :url="contact.url" :icon="contact.icon" :label="contact.label" />
          </li>
        </ul>
      </section>
      <section class="contact">
        <h3>Kontakt</h3>
        <ContactBox icon="locationDot.svg">
          <template #text>
            <p>Daniel Daub</p>
            <p>Elbestraße 50</p>
            <p>65428 Rüsselsheim</p>
          </template>
        </ContactBox>
        <ContactBox icon="phone.svg">
          <template #text>
            <a href="tel:00491724890833">+49 172 4890833</a>
          </template>
        </ContactBox>
        <ContactBox icon="envelope.svg">
          <template #text>
            <a href="mailto:info@herrdaub.de">info@herrdaub.de</a>
          </template>
        </ContactBox>
      </section>
      <img class="logo-orange" alt="logo" :src="require('@/assets/media/logos/logo_orange.png')" />
    </article>
    <article class="legals">
      <a href="#">Impressum</a>
      <a href="#">Datenschutz</a>
    </article>
    <p>Copyright &#169; 2022 Daniel Daub</p>
  </footer>
</template>
<script setup lang="ts">
  import IconLink from '@/components/IconLink.vue';
  import ContactBox from '@/components/ContactBox.vue';

  const contacts = {
    facebook: {label: 'Facebook', url: 'https://www.facebook.com/herrdaub', icon: 'facebook.svg'},
    instagram: {label: 'Instagram', url: 'https://www.instagram.com/herrdaub/', icon: 'instagram.svg'},
    youtube: {label: 'YouTube', url: 'https://www.youtube.com/Daniel%20Daub', icon: 'youtube.svg'},
  };


</script>
<style lang="scss" scoped>
  footer {
    border-top: 2px solid var(--orange);
    margin-bottom: 5vh;

    article:first-child {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 0 30px;

      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 300px;
      }
    }

    .legals {
      text-align: center;
      margin: 10vh 0 10px 0;

      a {
        margin: 0 10px;
      }
    }
  }

  h3 {
    font-weight: 500;
    color: var(--orange);
    margin: 20px 0 10px 0;
  }

  .follow-me {

    ul {
      padding: 0;
      margin: 0;
    }

    li {
      list-style-type: none;
    }
  }

  .contact {
    
    p {
      margin: 0;
    }
  }

  .logo-orange {
    width: 20%;
    min-width: 220px;
    margin: 15px 0;
    height: fit-content;
    align-self: center;
  }
</style>