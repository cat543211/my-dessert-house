<template>
  <div>
    <nav class="navbar navbar-expand-md">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/coupons">Coupons</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/orders">Orders</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
            data-target="#cartModal" data-toggle="modal">Cart</a>
          </li>
        </ul>
      </div>
    </nav>
    <Cart />
  </div>
</template>

<script>
import Cart from './Cart';

export default {
  components: {
    Cart,
  },
};
</script>

<style lang="scss" scoped>
nav {
  padding: 20px;
  border-bottom: 1px solid $main_light_gray;
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
}

.collapse {
  position: relative;
  height: 40px;
  @include media-breakpoint-down(sm) {
    height: unset;
  }
}

.navbar-expand-md .navbar-nav {
  position: absolute;
  right: 0;
  margin-top: 0;
  @include media-breakpoint-down(sm) {
    margin-top: 20px;
    position: relative;
  }
}

.router-link-exact-active {
  @include font_b($font_size: 15px);
}
</style>
