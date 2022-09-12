<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
@import "assets/style/main.scss";

#app {
  color: var(--main-text);
  background-color: var(--main-bg);
  min-height: 100vh;
}

</style>
