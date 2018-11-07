<template>
  <div class="container-fluid main">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './Header';

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
</style>
