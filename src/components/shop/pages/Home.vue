<template>
  <div class="row no-gutters">
    <div class="col-md-7 no-gutters order-md-2 order-2">
      <div class="hero no-gutters" :class="['bg-' + bgType]"></div>
    </div>
    <div class="col-12 order-md-3 order-1 title">
      <h1 class="text-center">Dessert House</h1>
    </div>
    <div class="col-md-5 order-md-1 menu order-3">
      <div class="col-12">
        <h2 class="offset-1 col-11">I want some...</h2>
      </div>
      <div class="col-12 justify-content-sm-center">
        <ul class="products_menu col-10 offset-2 ">
          <li @mouseover="bgType = 1">
            <router-link class="menu_list"
            :to="{name: 'Products', params: { status: 'cake' }}">Cup Cakes</router-link>
          </li>
          <li @mouseover="bgType = 2">
            <router-link class="menu_list"
            :to="{name: 'Products', params: { status: 'donut' }}">Donuts</router-link>
          </li>
          <li @mouseover="bgType = 3">
            <router-link class="menu_list"
            :to="{name: 'Products', params: { status: 'sweet' }}">Sweet</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bgType: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.hero {
  height: 80vh;
  background-size: cover;
  background-position: center;
  @include media-breakpoint-down(sm) {
    height: 200px;
    margin-bottom: 50px;
  }
}

.menu {
  @include media-breakpoint-up(md) {
    margin-top: 50px;
  }
}

.bg-1 {
  background-image: url('~static/img/cake_bg.jpg');
}

.bg-2 {
  background-image: url('~static/img/donut_bg.jpg');
}

.bg-3 {
  background-image: url('~static/img/sweet_bg.jpg');
}

.title {
  position: relative;
}

.title h1 {
  margin-top: -60px;
  @include font_eb($font_size: 60px);
  opacity: 0.5;

  @include media-breakpoint-down(sm) {
    @include font_eb($font_size: 30px);
    margin-top: 20px;
  }
}
</style>
