<template>
  <div id="app">
    <router-view/>
    <Error></Error>
  </div>
</template>

<script>
import Error from './components/share/Error';

export default {
  name: 'App',
  components: {
    Error,
  },
};
</script>

<style lang="scss">
@import './assets/all';
</style>

