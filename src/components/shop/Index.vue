<template>
  <div class="container-fluid main">
    <router-view class="content"></router-view>
    <Header />
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
  margin-top: 80px;
  @include media-breakpoint-down(sm) {
    margin-top: 65px;
  }
}
</style>
