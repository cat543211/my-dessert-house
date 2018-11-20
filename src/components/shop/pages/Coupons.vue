<template>
  <div class="row no-gutters">
    <!-- sidebar -->
    <div class="col-md-5 sidebar"></div>
    <!-- content -->
    <div class="col-md-7">
      <ul class="row col-12">
        <li class="coupon_item col-8 offset-2 row" v-for="(item, key) in coupons" :key="key">
          <div class="col-12 col-sm-9 coupon_content">
            <h1>{{ item.title }}</h1>
            <h3>Coupon Code: {{ item.code }}</h3>
          </div>
          <div class="col-3 coupon_icon">
            <i class="fas fa-gift align-middle"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupons: [
        {
          title: '80% Off',
          code: '80percent',
        },
        {
          title: '30% Off',
          code: '30percent',
        },
      ],
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

.coupon_item {
  background: $main_red;
  margin-bottom: 40px;
  padding: 20px 0;
  max-width: 500px;
}

.coupon_content {
  border-right: 4px dashed rgba(0, 0, 0, 0.3);
  padding: 20px 20px 20px 40px;
  @include media-breakpoint-down(xs) {
    border: none;
    padding: 20px 20px 20px 20px;
  }

  h1 {
    @include font_eb($font_size: 50px);
  }
}

.coupon_icon {
  font-size: 40px;
  text-align: center;
  @include media-breakpoint-down(xs) {
    display: none;
  }
}
</style>
