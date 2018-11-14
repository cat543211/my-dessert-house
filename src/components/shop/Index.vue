<template>
  <div class="container-fluid main">
    <Header />
    <router-view class="content"></router-view>
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

<style lang="scss" scoped>
.content {
  margin-top: 50px;
  @include media-breakpoint-down(sm) {
    margin-top: 0px;
  }
}
</style>
