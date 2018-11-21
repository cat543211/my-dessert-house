<template>
  <div class="row no-gutters">
    <!-- sidebar -->
    <div class="col-md-5 sidebar"></div>
    <!-- content -->
    <div class="col-md-7">
      <p>Orders</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-image: url('~static/img/coupon.jpg');
  height: 80vh;
  background-size: auto 40vw;
  background-repeat: no-repeat;
  background-position: top center;
  position: relative;
  @include media-breakpoint-down(sm) {
    height: 200px;
    margin-bottom: 50px;
    background-size: 100%;
    background-position: center;
  }
}
</style>
