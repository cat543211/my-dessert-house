<template>
  <div>
    <ul class="nav justify-content-end">
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
        <a class="nav-link" href="#">Cart</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  padding: 20px;
  border-bottom: 1px solid $main_light_gray;
}

.router-link-active {
  @include font_b($font_size: 15px);
}
</style>
